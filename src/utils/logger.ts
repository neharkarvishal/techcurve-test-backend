import winston from 'winston'

// winston formats:
const { cli, simple, combine, metadata, colorize, timestamp } = winston.format

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        metadata(),
    ),
    transports: [],
})

if (process.env.NODE_ENV !== 'production')
    logger.add(
        new winston.transports.Console({
            format: combine(cli(), colorize(), simple()),
        }),
    )

/** Morgan stream for HTTP Logger */
const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')))
    },
}

export { logger, stream }
