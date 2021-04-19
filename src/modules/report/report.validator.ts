import Joi from 'joi'

export const createReportSchema = Joi.object({
    reporter: Joi.string()
        .required() // mandatory field
        .min(2)
        .max(360),

    summary: Joi.string()
        .required() // mandatory field
        .min(2)
        .max(360),

    field: Joi.array()
        .items(
            Joi.object({
                fieldId: Joi.string().required(),
                nutrient: Joi.string().optional(),
                percentage: Joi.string().optional(),
                feedback: Joi.string().optional(),
            }),
        )
        .min(1),
}).label('Reports validation schema')

export const updateReportSchema = Joi.object({
    summary: Joi.string()
        .optional() // optional field
        .min(2)
        .max(360),

    reporter: Joi.string()
        .optional() // optional field
        .min(2)
        .max(360),

    field: Joi.array()
        .items(
            Joi.object({
                fieldId: Joi.string().required(),
                nutrient: Joi.string().optional(),
                percentage: Joi.string().optional(),
                feedback: Joi.string().optional(),
            }),
        )
        .optional(),
}).label('Reports validation schema')
