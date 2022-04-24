const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

// validation methods for each incoming request

module.exports = {
    signup: data =>
        Joi.object({
            name: Joi.string().min(1).max(50).required(),
            email: Joi.string().max(255).required().email(),
            password: Joi.string().min(3).max(255).required()
        }).validate(data),

    login: data =>
        Joi.object({
            email: Joi.string().min(1).max(255).required().email(),
            password: Joi.string().min(3).max(255).required()
        }).validate(data),

    update: data =>
        Joi.object({
            name: Joi.string().min(1).max(50).required(),
            address: Joi.string().required()
        }).validate(data),

    userId: data =>
        Joi.object({
            userId: Joi.objectId().required()
        }).validate(data),

    getAll: data =>
        Joi.object({
            keyword: Joi.string().optional().allow(''),
        }).validate(data)
}