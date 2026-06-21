const oracledb = require('oracledb');

let pool;

const initPool = async () => {
  pool = await oracledb.createPool({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTION_STRING,
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1
  });
  console.log('Oracle pool creado');
};

const getConnection = async () => {
  return await pool.getConnection();
};

module.exports = { initPool, getConnection };
