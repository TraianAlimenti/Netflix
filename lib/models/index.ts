"use strict";

import { Sequelize } from 'sequelize/types';
import Categories from './categories';
import Titles from './titles';

export const loadModelsIntoSequelizeInstance = (sequelizeInstance: Sequelize) => {
  const models: { [name: string]: any } = {
    Categories: Categories(sequelizeInstance),
    Titles: Titles(sequelizeInstance)
  };
  return models;
}