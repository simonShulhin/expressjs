var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
// var timeout = require('connect-timeout')
const { Movie } = require("../models");

const dataFilePath = path.join("data", "movies.json");

const readMoviesFromFile = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

const writeMoviesToFile = (movies) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2));
};

// Define the Movie model

/* GET home page. */
router.get("/", async (req, res, next) => {
  setTimeout(async () => {
    try {
      const movies = await Movie.findAll({
        order: [["id", "ASC"]],
      });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, 1000);
});

router.delete("/movies/:id", async (req, res) => {
  try {
    await Movie.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/movies", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.body.id);
    if (movie) {
      await movie.update(req.body);
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
