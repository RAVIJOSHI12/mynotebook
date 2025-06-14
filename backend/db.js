const mongoose = require('mongoose');

const mongoURI ="mongodb://localhost:27017/mynotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB Successfully");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  };

module.exports = connectToMongo;