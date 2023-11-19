import showMessage from "../util/dialogInvoker.js";
import constants from "../util/constants.js";
import oracledb from "oracledb";
import dotenv from 'dotenv';
import process from 'process';
import { table } from 'table';

dotenv.config();

/**
 * Connecting to Oracle DB Server
 * @returns {Promise<void>}
 */
const connectDB = async() => {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_PASSWORD,
            connectionString: process.env.ORACLE_DB_CONNECTION_STRING,
        });
        showMessage('Connected to Oracle DB', constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
        
        const result = await connection.execute('SELECT * FROM DH_CLIENT');
        
        console.log(table(result.rows));

    } catch(err) {
        showMessage(err.message, constants.ERROR.TYPE, constants.ERROR.CODE);
    } 
}

export default connectDB;