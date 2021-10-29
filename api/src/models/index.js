const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config.js");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const connect = async (attempt = 10) => {
  try {
    await sequelize.authenticate();
    if (process.env.LOG_LEVEL === "all" || process.env.LOG_LEVEL === "info") {
      console.log("Connection has been established successfully.");
    }
  } catch (error) {
    if (process.env.LOG_LEVEL === "all" || process.env.LOG_LEVEL === "error") {
      console.log(`Unable to connect to the database: ${error}`);
    }

    if (attempt > 0) {
      const waitingTime = 5;
      if (process.env.LOG_LEVEL === "all" || process.env.LOG_LEVEL === "info") {
        console.log(`Retrying in ${waitingTime} seconds`);
      }
      setTimeout(() => connect(attempt - 1), waitingTime * 1000);
    } else {
      if (
        process.env.LOG_LEVEL === "all" ||
        process.env.LOG_LEVEL === "error"
      ) {
        console.error(
          "Unable to connect to the database. Terminating Node process."
        );
      }
      process.abort();
    }
  }
};

const sendError = async (res, code) => {
  try {
    res.sendStatus(code);
  } catch (error) {
    if (process.env.LOG_LEVEL === "all" || process.env.LOG_LEVEL === "error") {
      console.error(error);
    }
  }
};

connect();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sendError = sendError;

module.exports = db;
