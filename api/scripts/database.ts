import { MongoClient, Db } from 'mongodb';
import { config } from './convict-config';


let database: Db;

export async function startDatabase() {
    const mongoDBURL = (config.get('db.auth.user') && config.get('db.auth.password'))
        ? `mongodb://${config.get('db.auth.user')}:${config.get('db.auth.password')}@${config.get('db.host')}/${config.get('db.name')}?retryWrites=true&w=majority`
        : `mongodb://${config.get('db.host')}/${config.get('db.name')}?retryWrites=true&w=majority`;


    const connection = await MongoClient.connect(mongoDBURL);
    database = connection.db();
}

export async function getDatabase(): Promise<Db> {
    if (!database) await startDatabase();
    return database;
}
