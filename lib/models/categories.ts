const { DataTypes } = require("sequelize");

export const CategoriesModel = (sequelize: any) =>
  sequelize.define(
    "Categories",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      // Other model options go here
    }
  );

export default CategoriesModel;
