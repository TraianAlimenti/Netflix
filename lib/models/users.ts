const { DataTypes } = require("sequelize");

export const UsersModel = (sequelize: any) =>
  sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

export default UsersModel;
