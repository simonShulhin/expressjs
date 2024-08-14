var express = require("express");
var router = express.Router();
const { User, Movie } = require("../models");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match; // true if passwords match, false otherwise
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

// Example usage

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const movies = await User.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  (async () => {
    const plainPassword = "userpassword123";
    const hashedPassword = "$2b$10$9Mdj.uVCa3wsQ2ICZmlaz.KfNQf2CgL6zeUnHA4Z8/TqwS.ckNmaq"; // Retrieved from database
    const isMatch = await comparePassword(plainPassword, hashedPassword);
    console.log("Password Match:", isMatch);
  })();
  try {
    const userId = req.params.id;

    // Fetch the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the favorite movie IDs from the user
    const favoriteMovieIds = user.favorite_movies || [];
    // console.log(user);

    // Fetch the favorite movies
    const favoriteMovies = await Movie.findAll({
      where: {
        id: favoriteMovieIds,
      },
      order: [["id", "ASC"]],
    });

    // Combine user data with favorite movies
    const userWithFavorites = {
      ...user.toJSON(), // Convert user instance to plain object
      favorite_movies: favoriteMovies, // Include favorite movies
    };

    res.json(userWithFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
