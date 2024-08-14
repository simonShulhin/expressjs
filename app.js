var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const cors = require("cors");
// const { Sequelize, DataTypes } = require("sequelize");
// const config = require("./config");

var app = express();

// const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
//   host: config.db.host,
//   dialect: config.db.dialect,
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// export const Movie = sequelize.define(
//   "Movie",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     rating: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     genres: {
//       type: DataTypes.ARRAY(DataTypes.STRING), // Postgres-specific array type
//       allowNull: false,
//     },
//     inTheaters: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "movies", // Explicitly specify the table name
//     freezeTableName: true, // Disable pluralization of table names
//     timestamps: false, // Disable automatic timestamps
//   }
// );

// sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's address
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const Movie = sequelize.define(
//   "Movie",
//   {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     director: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     year: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   { tableName: "movies" }
// );

// sequelize.sync();

module.exports = app;
