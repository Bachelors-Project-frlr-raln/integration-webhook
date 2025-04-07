import { MongoClient } from 'mongodb';

const uri = 'mongodb://beckn:beckn123@localhost:27017';
const client = new MongoClient(uri);

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the default database
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

export async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Failed to close MongoDB connection', error);
    }
}
