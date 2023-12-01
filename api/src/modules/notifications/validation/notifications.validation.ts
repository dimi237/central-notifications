import Joi, { ValidationResult } from 'joi';
import { BulkNotifications, Email, Sms } from '../models';

export const validateSendSms = (notif: Sms): ValidationResult => {
    const notification = Joi.object({
        tel: Joi.string().required().pattern(new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)).message('please enter a correct phone number'),
        message: Joi.string().required(),
        type: Joi.equal('sms')
    });


    return notification.validate(notif);
};


export const validateSendBulkSms = (notif: BulkNotifications): ValidationResult => {
    const notification = Joi.object({
        tel: Joi.string().required().pattern(new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)).message('please enter a correct phone number'),
        message: Joi.string().required(),
        type: Joi.equal('sms')
    });

    const schema = Joi.object({
        notifications: Joi.array().items(notification),
        senderEmail: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct sender email address'),
    });

    return schema.validate(notif);
};

export const validateSendEmail = (notif: Email): ValidationResult => {
    const notification = Joi.object({
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct reciever email address'),
        message: Joi.string().required(),
        object: Joi.string(),
        cc: Joi.string().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct copy email address'),
        type: Joi.equal('email')

    });

    return notification.validate(notif);
};

export const validateSendBulkEmail = (notif: BulkNotifications): ValidationResult => {
    const notification = Joi.object({
        email: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct reciever email address'),
        message: Joi.string().required(),
        object: Joi.string(),
        cc: Joi.string().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct copy email address'),
        type: Joi.equal('email')
    });

    const schema = Joi.object({
        notifications: Joi.array().items(notification),
        senderEmail: Joi.string().required().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)).message('please enter an correct sender email address'),
    });

    return schema.validate(notif);
};