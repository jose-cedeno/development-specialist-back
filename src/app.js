require('dotenv').config();
// EXPRESS
const express = require('express');
const app = express();
const cors = require('cors');
// ROUTES
const userRouter = require('./user/infraestructure/user.routes');
const billRouter = require('./bills/infraestructure/bill.routes');
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(billRouter);
// Handlers- Errors
module.exports = app;
