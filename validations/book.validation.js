const Joi = require('joi')

const bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        pages: Joi.number().required(),
        price: Joi.number().required(),
        isbn: Joi.string().min(10).required(),
        published_date: Joi.date().iso().required(),
        rating: Joi.number().required(),
        firstName: Joi.string().min(5).required(),
        lastName: Joi.string().required(),
        middleName: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })
    return  schema.validate(data);
}

module.exports = { bookValidation }