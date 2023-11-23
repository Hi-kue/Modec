import oracledb from "oracledb";
import process from "process";
import dotenv from "dotenv";

dotenv.config();
oracledb.autoCommit = true;

const connection = await oracledb.getConnection({
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    connectionString: process.env.ORACLE_DB_CONNECTION_STRING
});

export default connection;