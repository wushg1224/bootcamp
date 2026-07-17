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
    reviews: [{}],
  },
];
let nextId = 1;

//for id generate can use library like uuid and nanoid

// test on interface make sure it is working
//route inside a router is relative to where the router is mounted
movieRouter.get("/", (req, res) => {
  console.log("query:", req.query);
  console.log(Object.keys(req));
  console.log("url:", req.query);
  // const { keyword, sort, page = 1, limit = 10 } = req.query;
  res.json(req.query);
});

//post --create
movieRouter.post("/", (req, res) => {
  const { title, description, types } = req.body;

  //data validation
  //fail fast
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

app.listen(3000, () => {
  console.log("listening on 3000");
});
