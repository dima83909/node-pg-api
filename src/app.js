const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(errorHandler);

module.exports = app;