"use strict";

import { Sequelize } from 'sequelize/types';
import Categories from './categories';

export const loadModelsIntoSequelizeInstance = (sequelizeInstance: Sequelize) => {
  const models: { [name: string]: any } = {
    Categories: Categories(sequelizeInstance)
  };
  return models;
}