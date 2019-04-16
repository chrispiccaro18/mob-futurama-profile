const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./middleware/logger'));

app.use('/profile', require('./routes/profiles'));
app.use('/test', require('./routes/test'));

app.use(require('./middleware/notFound'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
