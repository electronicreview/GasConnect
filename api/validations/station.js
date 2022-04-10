const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: data =>
        Joi.object({
            title: Joi.string().min(1).max(200).required(),
            address: Joi.string().min(1).max(5000).required(),
            userId: Joi.objectId().required(),
            price: Joi.number().min(0.1).required(),
            dateUpdated: Joi.string().required(),
        }).validate(data),

    stationId: data =>
        Joi.object({
            stationId: Joi.objectId().required()
        }).validate(data),

    update: data =>
        Joi.object({
            userId: Joi.objectId().required(),
            price: Joi.number().min(0.1).required(),
            dateUpdated: Joi.string().required(),
        }).validate(data),

    getAll: data =>
        Joi.object({
            keyword: Joi.string().optional().allow(''),
        }).validate(data)
}
