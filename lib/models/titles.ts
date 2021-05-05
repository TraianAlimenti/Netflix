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
      allowNull: false, // TODO: should this be true? maybe it does not have a logo?
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
      type: DataTypes.STRING, // TODO: maybe this could be an enum? the PG ratings are already predetermined
      allowNull: false, // TODO: should this be true? maybe it does not have a pg rating?
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false, // TODO: should this be true? maybe it does not have a trailer?
    },
  });

export default TitlesModel;
