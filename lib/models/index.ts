"use strict";

import { Sequelize } from 'sequelize/types';
import Categories from './categories';
import Titles from './titles';
import Users from './users';
import Profiles from './profiles';
import Notifications from './notifications';
import ProfileNotifications from './profileNotifications';

export const loadModelsIntoSequelizeInstance = (sequelizeInstance: Sequelize) => {
  const models: { [name: string]: any } = {
    Categories: Categories(sequelizeInstance),
    Titles: Titles(sequelizeInstance),
    Users: Users(sequelizeInstance),
    Profiles: Profiles(sequelizeInstance),
    Notifications: Notifications(sequelizeInstance),
    ProfileNotifications: ProfileNotifications(sequelizeInstance)
  };
  return models;
}