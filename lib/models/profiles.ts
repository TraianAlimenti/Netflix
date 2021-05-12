const { DataTypes } = require("sequelize");

export const ProfilesModel = (sequelize: any) =>
  sequelize.define("Profiles", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });

export default ProfilesModel;
