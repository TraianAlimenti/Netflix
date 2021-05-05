require('dotenv').config(); // needed to be able to read the .env file
import { Sequelize } from 'sequelize';
import { loadModelsIntoSequelizeInstance } from '../lib/models';

module.exports = async () => {
  if (process.env.NODE_ENV !== 'test' || !process.env.DATABASE_DSN || !process.env.TEST_DATABASE_DSN) {
    const errorMsg = 'setup.ts: Tried to run but missing requirements. Exiting. TESTS WILL FAIL';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  // connect to pg, create database if missing
  const mainSequelize = new Sequelize(process.env.DATABASE_DSN ?? '', {
    logging: console.log
  });
  try {
    await mainSequelize.authenticate()
    await mainSequelize.query("DROP DATABASE IF EXISTS test");
    await mainSequelize.query("CREATE DATABASE test");
    await mainSequelize.close();
    const sequelize = new Sequelize(process.env.TEST_DATABASE_DSN ?? '', {
      logging: console.log
    });
    loadModelsIntoSequelizeInstance(sequelize); // we need this so the next sequelize.sync call knows what models to sync
    await sequelize.sync({ force: true });
    await sequelize.close();
  }
  catch (e) {
    console.error('An error occured while trying to create the testing database.', e);
  }
}