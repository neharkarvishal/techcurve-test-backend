/* eslint-disable @typescript-eslint/restrict-template-expressions */
import './config/env'

import * as http from 'http'

import app from './app'
import dbPromise from './config/database'
import { NotFound } from './exceptions/ApiException'
import routes from './routes'
import { logger } from './utils/logger'

Promise.all([dbPromise('app')])
    .then((dependencies) => {
        /** dependencies */
        const [db] = dependencies

        /** init routes */
        app.use(routes({ db }))

        /** 404'd paths -> forward to error handler */
        app.use((req, res, next) => {
            next(NotFound())
        })

        /** Error handler */
        app.use((e, req, res, next) => {
            logger.error(`${e.message}\n${e.stack}`)

            const response: Record<string, unknown> = {
                status: 500,
            }

            response.message = e.message

            if (e?.errors) response.error = e.errors

            // only providing error in development
            if (process.env.NODE_ENV === 'development') response.stack = e.stack

            res.status(500).json(response)
        })

        /** Create HTTP server */
        const server = http.createServer(app)
        const port = process.env.PORT || 4200

        server.listen(port)

        server.on('error', (error) => {
            // @ts-ignore
            if (error?.syscall !== 'listen') {
                throw error
            }

            logger.error(`${port} is already in use`)
            process.exit(1)
        })

        server.on('listening', () => {
            logger.info(`Listening on ${port}`)
        })

        return dependencies
    })
    .catch((e) => logger.error(e))
