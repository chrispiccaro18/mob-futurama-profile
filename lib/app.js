const express = require('express');

const app = express();

app.use(express.json());

app.use('/profile', require('./routes/profiles'));

app.use(require('./middleware/notFound'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
