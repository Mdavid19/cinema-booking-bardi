const pool = require('./db_connection/db_pool');

async function getClients() {
    const [rows] = await pool.query('SELECT * FROM client;')
    return rows;
}

async function registerClients(username, password) {
    let user = await getClientByUsername(username);
    
    if(!user){
        const result = await pool.query(`INSERT INTO client (username, password)
        VALUES (?,?)
        `, [username, password])
        return result
    }
        return false;
    
}

async function getClientByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM client WHERE username = ?;', [username])
    return rows[0];
}

module.exports = {
    getClients,
    registerClients,
    getClientByUsername,
}