import { Router } from 'express'
import mongoose from 'mongoose'

import reportController from './modules/report/report.controller'

const router = Router()

const routes = (options: { db: typeof mongoose }) => {
    router.use('/reports', reportController(options))

    return router
}

export default routes
