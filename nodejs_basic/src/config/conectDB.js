import mysql from 'mysql2/promise';

// const mysql  = require("mysql2/promise");

console.log('Created connection Pool... ==>')
// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:"shmily1611",
    database: 'movie'
});
export default pool;