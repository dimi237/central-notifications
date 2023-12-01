import Joi, { ValidationResult } from 'joi';
import { Credentials } from '../models';

export const validateLogin = (credentials: Credentials): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).message('enter a correct email please'),
        password: Joi.string().required()
    });

    return schema.validate(credentials);
};