import 'source-map-support/register'

import 'dotenv/config'

process.on('uncaughtException', (err: unknown, origin: unknown) => {
    console.log(
        '[process.on.uncaughtException]\nUnhandled Exception at:',
        err,
        '\n**Origin:',
        origin,
    )
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(
        '[process.on.unhandledRejection]\nUnhandled Rejection at:',
        promise,
        '\n**Reason:',
        reason,
    )
})

require('express-async-errors')
