import { Document, model, Schema } from 'mongoose'

export const ReportCollectionName = 'Report' as const

export interface ReportDocument extends Document {
    _id: string
    summary: string
    reporter: string
    field?: {
        fieldId?: string
        nutrient?: string
        percentage?: string
        feedback?: string
    }[]
}

export const ReportSchema = new Schema(
    {
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        reporter: {
            type: String,
            required: true,
            trim: true,
        },
        field: [
            {
                fieldId: { type: String },
                nutrient: { type: String },
                percentage: { type: String },
                feedback: { type: String },
            },
        ],
    },
    {
        timestamps: true,
        optimisticConcurrency: true,
    },
)

const ReportModel = model<ReportDocument>(ReportCollectionName, ReportSchema)

export default ReportModel
