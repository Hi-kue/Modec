import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import router from './routes/routes.js';
import cors from 'cors';

import showMessage from './util/dialogInvoker.js';
import constants from './util/constants.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(process.env.PORT, () => {
    showMessage(`Server is running at http://localhost:${process.env.PORT}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
});