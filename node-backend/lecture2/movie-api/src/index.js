const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

console.log(process.env.PORT); // "4000"

const express = require("express");
const cors = require("./middleware/cors.middleware");
const movieRouter = require("./routes/movie.route");

const app = express();

app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(helmet());

// express can parse json File
app.use(express.json());
app.use(cors);

//movieRouter
app.use("/v1/movies", movieRouter);

//port watching
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
