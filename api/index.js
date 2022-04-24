require('./db/connection')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const users = require('./routes/user');
const stations = require('./routes/station');

// adding middlewares
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configuring API routes
app.get('/', (req, res) => res.status(200).send("API is working..."));
app.use('/users', users);
app.use('/stations', stations);

// setting application port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));