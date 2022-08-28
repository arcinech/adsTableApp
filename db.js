require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === 'production') {
    dbUri = process.env.MONGODB_URI;
  } else if (NODE_ENV === 'test') {
    dbUri = 'mongodb://localhost:27017/AdsTableTest';
  } else {
    dbUri = 'mongodb://localhost:27017/AdsTable';
  }
  // connect to DB
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  // on success
  db.once('open', () => {
    if (NODE_ENV === 'production') {
      console.log('Connected to MongoDB');
    } else if (NODE_ENV === 'test') {
      console.log('Connected to the database localhost:27017/AdsTableTest');
    } else {
      console.log('Connected to the database localhost:27017/AdsTable');
    }
  });

  // on error
  db.on('error', err => console.log('Error ' + err));
};
module.exports = connectToDB;
