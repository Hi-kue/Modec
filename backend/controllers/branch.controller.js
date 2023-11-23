import connection from '../config/config.js';
import showMessage from '../util/dialogInvoker.js';
import constants from '../util/constants.js';
import { table } from 'table';

/**
 * Error message if query fails to execute.
 * @param {*} res The response object.
 * @param {*} err The error being thrown.
 */
const errorMessage = (res, err) => {
    showMessage(err, constants.ERROR.TYPE, constants.ERROR.CODE);
    res.status(400).json({ message: `Querying Failed`, error: err });   
}

/**
 * Success message if the query executes successfully.
 * @param {*} res The response object.
 * @param {*} data The data being returned.
 */
const successMessage = (res , data) => {
    showMessage("Query was Successful.", constants.SUCCESS.TYPE, constants.SUCCESS.CODE); 
    res.status(200).json({ message: `Querying Successful`, data: data })
}


