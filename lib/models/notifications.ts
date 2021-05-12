const { DataTypes } = require("sequelize");

export const NotificationsModel = (sequelize: any) =>
  sequelize.define("Notifications", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

export default NotificationsModel;
