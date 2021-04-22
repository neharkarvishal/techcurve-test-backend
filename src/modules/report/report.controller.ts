/* eslint-disable consistent-return,@typescript-eslint/no-misused-promises */
import express, { RequestHandler } from 'express'
import mongoose from 'mongoose'

import validObjectId from '../../middlewares/objectId.validator.middleware'
import validator from '../../middlewares/validator.middleware'
import reportService from './report.service'
import { createReportSchema, updateReportSchema } from './report.validator'

const { getReportById, getReports, createReport, updateReport } = reportService()

const router = express.Router()

/** RequestHandler */
export function getAllReportsHandler(options): RequestHandler {
    return async (req, res, next) => {
        try {
            const { query = {} } = req
            const data = await getReports(query)

            res.done({ data })
        } catch (e) {
            return next(e)
        }
    }
}

/** RequestHandler */
export function getReportByIdHandler(options): RequestHandler {
    return async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await getReportById({ id })

            res.done({ code: 200, data })
        } catch (e) {
            return next(e)
        }
    }
}

/** RequestHandler */
export function createReportHandler(options): RequestHandler {
    return async (req, res, next) => {
        try {
            const data = await createReport({ fields: req.body })

            res.done({ data, code: 201 })
        } catch (e) {
            return next(e)
        }
    }
}

/** RequestHandler */
export function updateReportHandler(options): RequestHandler {
    return async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await updateReport({ fields: req.body })

            res.done({ data })
        } catch (e) {
            return next(e)
        }
    }
}

/** Report Controller */
function reportController(options: { db: typeof mongoose }) {
    /** GET */
    router.get('/', getAllReportsHandler(options))

    /** GET */
    router.get('/:id', validObjectId(), getReportByIdHandler(options))

    /** POST */
    router.post('/', validator(createReportSchema), createReportHandler(options))

    /** PUT */
    router.put('/', validator(updateReportSchema), updateReportHandler(options))

    return router
}

export default reportController
