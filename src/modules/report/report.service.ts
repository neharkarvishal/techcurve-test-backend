import { NotFound } from '../../exceptions/ApiException'
import { logger } from '../../utils/logger'
import ReportModel from './report.model'

const projection = {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0,
}

/** Get all of the records */
async function getReports(query: Record<string, any> = {}) {
    try {
        return await ReportModel.findOne({}, projection).lean()
    } catch (e) {
        return Promise.reject(e)
    }
}

/** Get single record by id */
async function getReportById({ id }: { readonly id: string }) {
    try {
        const existingReport = await ReportModel.findOne(
            {
                _id: id,
            },
            projection,
        ).exec()

        if (!existingReport) throw NotFound({ reportId: 'Report does not exist.' })

        return existingReport
    } catch (e) {
        return Promise.reject(e)
    }
}

/** Create one record */
async function createReport({ fields }: { fields: any }) {
    try {
        const newReport = new ReportModel(fields)

        const savedReport = await newReport.save()

        logger.info(`Report saved: ${savedReport._id}`)

        return savedReport.toObject()
    } catch (error) {
        logger.error(`Report create failed`)
        return Promise.reject(error)
    }
}

/** Update one record */
async function updateReport({ id, fields }: { readonly id: string; fields: any }) {
    try {
        const existing = await ReportModel.findOne({
            _id: id,
        }).exec()

        if (!existing) throw NotFound({ reportId: 'Report does not exist.' })

        return existing.toObject()
    } catch (e) {
        return Promise.reject(e)
    }
}

/** Service */
function reportService() {
    return {
        getReports,
        getReportById,
        createReport,
        updateReport,
    }
}

export default reportService
