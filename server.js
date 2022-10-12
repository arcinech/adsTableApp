require('dotenv').config({ silent: true });
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const connectToDB = require('./db');
const { sessionStorage } = require('./db');
//start express server
const app = express();

// connectToDB and session middleware
connectToDB();

// add middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:8000'],
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware for session
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStorage,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  }),
);

// serve static files from the React app directory
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
