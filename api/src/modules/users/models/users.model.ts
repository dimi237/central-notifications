import { BaseModel } from 'common';

export class User implements BaseModel {
    _id?: any;
    name: string;
    email: string;
    password: string;
    token?: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    isValid() {
        return this.name && this.email && this.password;
    }
}

