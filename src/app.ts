import cors from 'cors'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'

import { stream } from './utils/logger'

/** Response helper */
function successResponder(
    this,
    options: {
        data: Record<any, any> | Array<any> | any
        paging?: Record<string, unknown>
        code?: number
        message?: string
        status?: 'success' | 'error'
    },
): void {
    const { data, message = 'OK', code = 200, paging, status = 'success' } = options

    // `this` refers to the bonded `res` object
    this.status(code).json({
        data,
        status,
        paging,
        message,
    })
}

/** initialize your `app` with routes from Modules */
const app = express()

/** Setting up loggers and middlewares */
app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream }),
    express.json(),
    express.urlencoded({ extended: false }),
    cors(),
    mongoSanitize({ replaceWith: '_' }),
)

/** Binding response helper to `res` object to end the request */
app.use((req, res, next) => {
    res.done = successResponder.bind(res)
    next()
})

export default app
