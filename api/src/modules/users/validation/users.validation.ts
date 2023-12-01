import Joi, { ValidationResult } from 'joi';
import { User } from '../models';

export const validateCreateUser = (user: User): ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().pattern(new RegExp('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}', 'g')),
        pasword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(user);
};