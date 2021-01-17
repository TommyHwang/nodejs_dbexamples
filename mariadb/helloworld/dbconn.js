const mariadb = require('mariadb');
require('dotenv').config()
 
const pool = mariadb.createPool({
    host: process.env.DBHost, port: process.env.DBPort,
    user: process.env.DBUser, password: process.env.DBPass,
    connectionLimit: 5
});
 
async function GetUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE nodejs_test');
        rows = await conn.query('SELECT * FROM users;');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}
 
module.exports = {
    getUserList: GetUserList
}