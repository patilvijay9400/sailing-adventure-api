const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./db/database');
const sailorsRouter = require('./routes/sailors');
const boatsRouter = require('./routes/boats');
const reservesRouter = require('./routes/reserves');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/sailors', sailorsRouter);
app.use('/api/boats', boatsRouter);
app.use('/api/reserves', reservesRouter);

// Define your routes for CRUD operations here

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
