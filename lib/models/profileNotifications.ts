const { DataTypes } = require("sequelize");

export const profileNotificationsModel = (sequelize: any) =>
  sequelize.define("profileNotifications", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notificationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ack: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

export default profileNotificationsModel;
