require('dotenv').config();
// EXPRESS
const express = require('express');
const app = express();
const cors = require('cors');
// ROUTES
const userRouter = require('./user/infraestructure/user.routes');
app.use(express.json());
app.use(cors());
app.use(userRouter);
// Handlers- Errors
module.exports = app;
