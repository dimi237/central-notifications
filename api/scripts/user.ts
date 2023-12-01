import inquirer from 'inquirer'
import { logger } from './winston-config';
import { getDatabase } from './database';
import { isEmpty } from 'lodash';
import { hash } from 'bcrypt';
import { config } from './convict-config';

(async () => {
    const db = await getDatabase();

    const qestions = [
        { type: 'input', name: 'email', message: 'The email of the user?' },
        { type: 'input', name: 'name', message: 'The name of the user?' },
        { type: 'input', name: 'clearPassword', message: 'The password of the user?' },
    ]
    try {
        const answers = await inquirer.prompt(qestions);
        const { email, name, clearPassword } = answers;
        const existing = db.collection('users').findOne({ email });

        if (!isEmpty(existing)) {
            logger.error('Email allready used');
            return new Error('EmailAllreadyUsed');
        }
        const password = await hash(clearPassword, config.get('saltRounds'));
        const user = { email, name, password }
        const result = await db.collection('users').insertOne(user);

        if (result instanceof Error) { return result; }

        console.log(`User ${name} created successfully`)
    } catch (error: any) {
        console.log(error)
    } finally {
        process.exit();
    }


})()