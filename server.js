require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

//start express server
const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// connectToDB
connectToDB();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(mongoose.connection.client.s.url);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    resave: false,
    saveUninitialized: false,
  }),
);

// serve static files from the React app directory
app.use(express.static(path.join(__dirname, 'client/build')));

//add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
