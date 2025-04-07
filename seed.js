const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://beckn:beckn123@localhost:27017';

const test = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB!");

    // Define a simple schema
    const ServiceSchema = new mongoose.Schema({
      _id: String,
      name: String,
      short_desc: String,
      long_desc: String,
      price: {
        currency: String,
        value: String,
      },
      location: String,
      location_id: String,
    });

    // Insert dummy data

    const Service = mongoose.model('Service', ServiceSchema);

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

    await Service.deleteMany({});
    console.log("✅ Cleared existing data in the 'services' collection");

    await Service.insertMany(seedData);
    console.log("✅ Inserted dummy item into 'test_items' collection");

    // Retrieve it
    const items = await TestItem.find({});
    console.log("📦 Retrieved items:", items);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

test();