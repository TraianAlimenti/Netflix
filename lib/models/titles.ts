const { DataTypes } = require("sequelize");

const TitlesModel = (sequelize: any) =>
  sequelize.define("Titles", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showInformation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export default TitlesModel;
