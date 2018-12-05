var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.SQLHOST,
      user : process.env.SQLLOGIN,
      password : process.env.SQLPASSWORD,
      database : process.env.SQLDATABASE
    }
  });

  module.exports = knex;