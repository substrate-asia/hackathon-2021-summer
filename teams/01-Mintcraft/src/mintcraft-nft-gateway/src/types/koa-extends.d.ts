// import files
import '@koa'

// koa-bodyparser
declare module 'koa' {
  interface Request {
    body: string | Record<string, unknown>
    rawBody: string
  }
}
