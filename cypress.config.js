const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "sql8.freesqldatabase.com",
      user: "sql8699610",
      password: "viMgrCC9jm",
      database: "sql8699610",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

const mysql = require("mysql");

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
