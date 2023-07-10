const pool = require('./db_connection/db_pool');

async function getChairs() {
  const [rows] = await pool.query('SELECT * FROM chair')
  return rows;
}



// Function to acquire a lock on the chair
async function acquireLock(chairId) {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Begin a transaction
    await connection.beginTransaction();

    // Acquire a lock on the chair row
    const selectQuery = 'SELECT * FROM chair WHERE chairId = ? FOR UPDATE';
    const [results] = await connection.query(selectQuery, [chairId]);

    const chair = results[0];
    if (!chair || chair.status === 'RESERVED' || chair.status === 'PAID') {
      throw new Error('Chair is already reserved');
    }

    // If the lock is acquired successfully, pass the connection to the caller
    return connection;
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
      connection.destroy();
    }
    throw error;
  }
}

// Function to release the lock and commit the transaction
async function releaseLock(connection) {
  try {
    // Commit the transaction
    await connection.commit();

    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}

async function bookChair(chairId, userId) {
  try {
    // Acquire the lock on the chair
    const connection = await acquireLock(chairId);

    // Update the chair status to reserved
    const updateQuery = 'UPDATE chair SET status = ?, clientId = ? WHERE chairId = ?';
    await connection.query(updateQuery, ["RESERVED", userId, chairId]);

    // Release the lock and commit the transaction
    await releaseLock(connection);

    releaseChair(chairId);

    return true
  } catch (error) {
    console.log(error)
    return false

  }
}

async function releaseChair(chairId) {
  const releaseQuery = 'UPDATE chair SET status = ?, clientId = ? WHERE chairId = ?';
  setTimeout(async () => {
    let [rows] = await pool.query('SELECT * FROM chair where chairId = ?', [chairId])
    if (rows[0].status === 'RESERVED') {
      pool.query(releaseQuery, ["FREE", null, chairId])
    }
  }, 2 * 60 * 1000)
}

async function setPaidChair(chairId) {
  const setCHairToPaidQuery = 'UPDATE chair SET status = "PAID" WHERE chairId = ?'
  try {
    await pool.query(setCHairToPaidQuery, [chairId])

  } catch (error) {
    throw error
  }
}

module.exports = {
  getChairs,
  bookChair,
  setPaidChair
}