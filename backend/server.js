import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import bodyParser from 'body-parser';

import showMessage from './util/dialogInvoker.js';
import constants from './util/constants.js';

const app = express();
dotenv.config();


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Dream Home Application API.');
});

app.listen(process.env.PORT, () => {
    showMessage(`Server is running at http://localhost:${process.env.PORT}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
});