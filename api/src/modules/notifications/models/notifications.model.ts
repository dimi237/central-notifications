import { BaseModel } from 'common';

export interface Notification extends BaseModel {
    _id?: any;
    message: string;
    type?: 'SMS' | 'EMAIL',
    status?: NotificationStatus
}

export interface Sms extends Notification {
    _id?: any;
    tel: string;
    type?: 'SMS'
}

export interface Email extends Notification {
    _id?: any;
    email: string;
    object: string;
    cc: string;
    attachements: Attachement[];
    type?: 'EMAIL'

}

export interface Attachement {
    content?: string;
    contentType?: string;
    name?: string;
}

export interface BulkNotifications extends BaseModel {
    senderEmail: string;
    status?: NotificationStatus
    dates?: {
        recieved?: number;
        send?: number
    }
    notifications: Notification[];
}

export type NotificationStatus =  'INITIATED' | 'PENDING' | 'STOPPED' | 'PAUSED' | 'PROCESSING' | 'FAILED' | 'SUCCESS';

