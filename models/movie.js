const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path according to your project structure

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Postgres-specific array type
      allowNull: false,
    },
    inTheaters: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "movies", // Explicitly specify the table name
    freezeTableName: true, // Disable pluralization of table names
    timestamps: false, // Disable automatic timestamps
  }
);

// sequelize.sync();

module.exports = Movie;
