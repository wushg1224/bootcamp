const express = require("express");
const app = express();
const port = 3000;

//global middleware
app.use(express.json());
//route param ==
//users/:userId

//query param ==get
//?key=value

//not method
//app.function
app.use("/test/:testId/:name", (req, res) => {
  const { testId, testid = 1, name } = req.params;
  //testid =>undefined and in json it got deleted
  const query = req.query;
  const body = req.body;
  res.json({ testId, testid, name, query, body });
});

//global middleware

app.use((req, res, next) => {
  res.json("global");
  next();
  //   console.log(1);
  //   res.json("global");
});
app.use("/", (req, res) => {
  res.json("root");
});

//.method(pathname, route handler)
app.get("/", (req, res) => {
  //   res.send("Hello World!");
  res.json("hello hell");
});

app.get("/123", (req, res) => {
  //   res.send("Hello World!");
  res.json([1, 2, 3]);
});

app.post("/", (req, res) => {
  res.json([1, 3, 3]);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

//middleware
//middleware chain(functions call in sequencial)
//error middleware
//error middleware chain

//m1, m2, m3
//(req, res, next)
// res.json(); next()
// res.json()
// next(error)

// look at path. --method ---sequence to decide the sequence of excute
