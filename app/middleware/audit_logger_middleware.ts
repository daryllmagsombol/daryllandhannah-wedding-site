import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import AuditLog from '#models/audit_log'
import { UAParser } from 'ua-parser-js'
export default class AuditLoggerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await next()

    const { request, response, auth } = ctx

    if (request.url() === '/favicon.ico') {
      return
    }

    try {
      const userAgentString = request.header('user-agent')
      const parser = new UAParser(userAgentString)
      const device = parser.getResult()

      await AuditLog.create({
        userId: auth?.user && auth?.user?.id,
        ipAddress:
          request.ip() ||
          request.header('cf-connecting-ip') ||
          request.header('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: JSON.stringify({
          device,
          userAgentString,
        }),
        requestMethod: request.method(),
        requestUrl: request.url(),
        requestBody: request.all(),
        responseStatus: response.response.statusCode,
        responseBody: response.lazyBody,
        errorMessage:
          response.response.statusCode >= 400 ? JSON.stringify(response.lazyBody) : null,
        createdBy: auth?.user ? auth?.user?.username : null,
      })
    } catch (error) {
      // Optionally log error to console, but do not send to user or stop request
      console.error('Audit log failed:', error)
    }
  }
}
