const express = require("express");
const {
  getAllmovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  createReview,
  getReviews,
} = require("../controller/movie.controller");

const movieRouter = express.Router();

//get all movies
movieRouter.get("/", getAllmovies);

//post --create
movieRouter.post("/", createMovie);
//get by id
movieRouter.get("/:id", getMovieById);

//update movie
movieRouter.put("/:id", updateMovieById);

//delete movie
movieRouter.delete("/:id", deleteMovieById);

//create reviews
movieRouter.post("/:id/reviews", createReview);

//get reviews
movieRouter.get("/:id/reviews", getReviews);

//export
module.exports = movieRouter;
