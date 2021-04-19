import mongoose, { ConnectionOptions } from 'mongoose'

import { logger } from '../utils/logger'

const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env

export const dbConnection: {
    url: string
    options: ConnectionOptions
} = {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    options: {
        poolSize: 10,
        keepAlive: true, // 300000
        connectTimeoutMS: 30000,
        autoIndex: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        user: undefined,
        pass: undefined,
    },
}

if (process.env.NODE_ENV !== 'production' || Boolean(process.env.DB_DEBUG)) {
    mongoose.set('debug', true)
}

export default async (type = 'app') => {
    try {
        return await mongoose
            .connect(dbConnection.url, dbConnection.options)
            .then((m) => {
                m.connection.on('error', (err) => {
                    logger.error(err)
                })

                m.connection.on('disconnected', () => {
                    logger.warn('[DB] mongodb disconnected')
                })

                m.connection.once('open', () => {
                    logger.info('[DB] mongodb connection established')
                })

                return m
            })
    } catch (e) {
        logger.error(e)
        return Promise.reject(e)
    }
}
