import * as sql from 'mssql';
import env from 'dotenv';
env.config(); 

const { MSSQLUSER, MSSQLHOST, MSSQLPORT, MSSQLPASSWORD, MSSQLDATABASE } = process.env;

if (process.env.NODE_ENV === 'development')
    console.log(`Connecting to ${MSSQLUSER} ${MSSQLHOST}:${MSSQLPORT}`);

export const sqlconfig: sql.config = {
    user: MSSQLUSER,
    password: MSSQLPASSWORD,
    server: MSSQLHOST || '', 
    database: MSSQLDATABASE,
    options: {
        trustServerCertificate: true
    }
}