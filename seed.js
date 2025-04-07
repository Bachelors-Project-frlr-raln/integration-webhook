import { MongoClient } from 'mongodb';

async function seedDatabase() {
  const uri = 'mongodb://beckn:beckn123@localhost:27017'; // Update this if your MongoDB URI is different
  const dbName = 'foobar'; // Database name
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const servicesCollection = db.collection('services');

    // Clear existing data
    await servicesCollection.deleteMany({});
    console.log('Cleared existing data in the services collection');

    // Insert seed data
    const seedData = [
      {
        _id: 'service1',
        name: 'Service One',
        short_desc: 'Short description for Service One',
        long_desc: 'Detailed description for Service One',
        price: {
          currency: 'USD',
          value: '100.00',
        },
        location: 'IND',
        location_id: 'loc1',
      },
      {
        _id: 'service2',
        name: 'Service Two',
        short_desc: 'Short description for Service Two',
        long_desc: 'Detailed description for Service Two',
        price: {
          currency: 'USD',
          value: '200.00',
        },
        location: 'IND',
        location_id: 'loc2',
      },
      {
        _id: 'service3',
        name: 'Service Three',
        short_desc: 'Short description for Service Three',
        long_desc: 'Detailed description for Service Three',
        price: {
          currency: 'USD',
          value: '300.00',
        },
        location: 'IND',
        location_id: 'loc3',
      },
    ];

    const result = await servicesCollection.insertMany(seedData);
    console.log(`Inserted ${result.insertedCount} documents into the services collection`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();