import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password')
})

.with("password", "confirmPassword")


export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
    password: Joi.string()
        .required()
})
.with("email", "password")


export const postSchema= Joi.object({
    body: Joi.string()
        .required(),
})

export const commentSchema= Joi.object({
    comment: Joi.string()
        .required(),
})