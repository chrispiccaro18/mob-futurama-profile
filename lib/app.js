const express = require('express');

const app = express();

app.use(require('./middleware/notFound'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
