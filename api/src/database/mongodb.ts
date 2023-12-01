import { MongoClient, Db, MongoClientOptions, Collection } from 'mongodb';
import { config } from 'convict-config';

const { host, name, auth } = config.get('db');
const { user, password } = auth;

const qAuth = user && password ? `${user}:${password}@` : '';

const mongoDBURL = `mongodb://${qAuth}${host}/${name}?retryWrites=true&w=majority`;

const options: MongoClientOptions = {};
if (user && password) { options.auth = { username: user, password }; }

const dbClient = new MongoClient(mongoDBURL, options);

let database: Db;

export async function startDatabase() {
    const connection = await dbClient.connect();
    database = connection.db();
}

// connect to MongoDB database
export async function getDatabase(): Promise<Db> {
    if (!database) await startDatabase();
    return database;
}

// connect to MongoDB database
export async function getCollection(collectionName: string): Promise<Collection<Document>> {
    return (await getDatabase()).collection(collectionName || '');
}

