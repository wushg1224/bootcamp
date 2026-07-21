const express = require("express");

const app = express();

// express can parse json File
app.use(express.json());

const movieRouter = express.Router();

//router mounting
app.use("/v1/movies", movieRouter);

//temparory database only exits when server start
const movies = [
  {
    id: 0,
    title: "Inception",
    description: "A skilled thief steals secrets from dreams.",
    types: ["Sci-Fi"],
    averageRating: 4.5,
    reviews: [
      {
        id: 1,
        content: "amazing movie",
        rating: "5",
      },
      {
        id: 2,
        content: "amazing movie",
        rating: "4",
      },
    ],
  },
  {
    id: 1,
    title: "manchester by the sea",
    description: "A miserable man",
    types: ["Story"],
    averageRating: 4.0,
    reviews: [{}],
  },
];
let nextId = 2;

//for id generate can use library like uuid and nanoid

// test on interface make sure it is working
//route inside a router is relative to where the router is mounted
movieRouter.get("/", (req, res) => {
  console.log("query:", req.query);
  console.log("next");
  let { keyword, sort, page = 1, limit = 10, bla } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  //shallow copy
  let filteredMovies = [...movies];

  //keyword sort
  if (keyword) {
    filteredMovies = filteredMovies.filter((movie) => {
      const insensitiveTitle = movie.title.toLowerCase();
      const insensitiveDescrition = movie.description.toLowerCase();
      const insensitiveKeyword = keyword.toLowerCase();
      return (
        insensitiveTitle.includes(insensitiveKeyword) ||
        insensitiveDescrition.includes(insensitiveKeyword)
      );
    });
  }

  //sort by testing a name like bla to write code for filtering
  if (bla) {
    filteredMovies = filteredMovies.filter((movie) => {
      const insensitiveDescrition = movie.description.toLowerCase();
      return insensitiveDescrition.includes(bla);
    });
  }

  //sort by rating
  if (sort === "rating") {
    filteredMovies.sort((a, b) => a.averageRating - b.averageRating);
  } else if (sort === "-rating") {
    filteredMovies.sort((a, b) => b.averageRating - a.averageRating);
  }

  //pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  filteredMovies = filteredMovies.slice(startIndex, endIndex);

  res.json(filteredMovies);
});

//post --create
movieRouter.post("/", (req, res) => {
  const { title, description, types } = req.body;
  //data validation
  if (!title || !description || !Array.isArray(types) || types.length === 0) {
    res.status(400).json({
      message: "all fileds are requeired",
    });
    return;
  }
  const movie = {
    id: nextId++,
    title,
    description,
    types,
    averageRating: 0,
    reviews: [],
  };
  movies.push(movie);
  res.status(201).json(movie);
});
//get by id
movieRouter.get("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).json({
      message: "movie not found",
    });
    return;
  }
  res.json(movie);
});

//update movie
movieRouter.put("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).json({
      message: "movie not found",
    });
    return;
  }
  //partial updates
  const { title, description, types } = req.body;
  if (title) {
    movie.title = title;
  }
  if (description) {
    movie.description = description;
  }

  if (types) {
    if (!Array.isArray(types) || types.length === 0) {
      res.status(400).json({ message: "Types must be an array" });
      return;
    }
    movie.types = types;
  }

  res.json(movie);
});

//delete movie
movieRouter.delete("/:id", (req, res) => {
  const movieIndex = movies.findIndex(
    (movie) => movie.id === parseInt(req.params.id),
  );
  //if not found
  if (movieIndex === -1) {
    res.status(404).jsono({
      message: "Movie not found",
    });
    return;
  }
  //if found
  movies.splice(movieIndex, 1);
  res.sendStatus(204);
});

//create reviews
movieRouter.post("/:id/reviews", (req, res) => {
  //find the movie first
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  //if no found
  if (!movie) {
    res.status(404).json({
      message: "movie not found",
    });
    return;
  }
  //if found
  const { content, rating } = req.body;
  //validation
  if (!content || !rating || (rating < 1) | (rating > 5)) {
    res.status(400).json({
      message: "content is required and rating is between 1-5",
    });
    return;
  }
  //create new review
  const newReview = {
    id: nextId++,
    content,
    rating,
  };

  movie.reviews.push(newReview);

  //get average review
  movie.averageRating = parseFloat(
    (
      movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
      movie.reviews.length
    ).toFixed(2),
  );

  res.status(201).json(newReview);
});

//get reviews
movieRouter.get("/:id/reviews", (req, res) => {});

app.listen(3000, () => {
  console.log("listening on 3000");
});
