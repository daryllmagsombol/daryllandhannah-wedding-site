import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import AuditLog from '#models/audit_log'

export default class AuditLoggerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await next()

    const { request, response, auth } = ctx

    if (request.url() === '/favicon.ico') {
      return
    }

    try {
      await AuditLog.create({
        userId: auth.user?.id,
        ipAddress: request.ip(),
        userAgent: request.header('user-agent'),
        requestMethod: request.method(),
        requestUrl: request.url(),
        requestBody: request.all(),
        responseStatus: response.response.statusCode,
        responseBody: response.lazyBody,
        errorMessage:
          response.response.statusCode >= 400 ? JSON.stringify(response.lazyBody) : null,
        createdBy: auth.user?.username,
      })
    } catch (error) {
      // Optionally log error to console, but do not send to user or stop request
      console.error('Audit log failed:', error)
    }
  }
}
