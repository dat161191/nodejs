// get the client
import mysql from 'mysql2/promise';

// const mysql  = require("mysql2/promise");

console.log('Created connection Pool... ==>')
// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:"shmily1611",
    database: 'shopping-cart'
});

// simple query
// connection.query(
//     'SELECT * FROM `users` ',
//     function (err, results, fields) {
//         console.log('=> check conect')
//         console.log(results); // results contains rows returned by server
//         // console.log(fields); // fields contains extra meta data about results, if available
//     }
// );
export default pool;