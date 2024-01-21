const Joi = require('joi')

const updateValidation = (data) => {

    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        pages: Joi.number().required(),
        price: Joi.number().required(),
        isbn: Joi.string().min(10).required(),
        rating: Joi.number().required(),
        status:Joi.string()
    })
    return  schema.validate(data);
}

module.exports = { updateValidation }