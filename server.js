const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');

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
app.use(express.urlencoded({ extended: true }));

// serve static files from the React app directory
app.use(express.static(path.join(__dirname, 'client/build')));

//add routes
