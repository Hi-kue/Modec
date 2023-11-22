import showMessage from "../util/dialogInvoker.js";
import constants from "../util/constants.js";
import oracledb from "oracledb";
import process from "process";
import dotenv from "dotenv";
import { table } from "table";

dotenv.config();
oracledb.autoCommit = true;

/**
 * Connection Pool for OracleDB Access
 * @returns {Promise<void>}
 */
const pool = await oracledb.createPool({
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    connectionString: process.env.ORACLE_DB_CONNECTION_STRING
});

export default pool;