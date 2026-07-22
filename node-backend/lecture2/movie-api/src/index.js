const express = require("express");
const cors = require("./middleware/cors.middleware");
const movieRouter = require("./routes/movie.route");

const app = express();

// express can parse json File
app.use(express.json());
app.use(cors);

//movieRouter
app.use("/v1/movies", movieRouter);

//port watching
app.listen(3000, () => {
  console.log("listening on 3000");
});
