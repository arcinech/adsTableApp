require('dotenv').config({ silent: true });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDBandSession, middleware } = require('./db');
//start express server
const app = express();

// connectToDB and session middleware
connectToDBandSession();

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
app.use(middleware);

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
