const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection setup
const dbURI = `mongodb+srv://yash18chouhan:J2sqQkZObeONVgco@cluster0.a6fmka5.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/', authRoutes);
app.use('/', taskRoutes);

// Start the server
app.listen(port,'192.168.1.5', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
