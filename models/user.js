const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path according to your project structure

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    english_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    salary_type: {
      type: DataTypes.STRING, // Postgres-specific array type
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    favorite_movies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Store favorite movie IDs
      allowNull: true,
    },
  },
  {
    tableName: "users", // Explicitly specify the table name
    freezeTableName: true, // Disable pluralization of table names
    timestamps: false, // Disable automatic timestamps
  }
);

sequelize.sync();

module.exports = User;
