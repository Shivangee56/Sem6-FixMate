const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/fixmate_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
