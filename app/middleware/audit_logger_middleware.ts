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

      // Truncate or limit error message length
      const errorMessage =
        response.response.statusCode >= 400
          ? this.truncateErrorMessage(JSON.stringify(response.lazyBody))
          : null

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
        errorMessage: errorMessage,
        createdBy: auth?.user ? auth?.user?.username : null,
      })
    } catch (error) {
      // Optionally log error to console, but do not send to user or stop request
      console.error('Audit log failed:', error)
    }
  }

  /**
   * Truncate error message to prevent database column overflow
   */
  private truncateErrorMessage(message: string | null): string | null {
    if (!message) return null

    // Limit to 1000 characters (adjust based on your column size)
    const maxLength = 1000

    if (message.length <= maxLength) {
      return message
    }

    return message.substring(0, maxLength - 3) + '...'
  }
}
