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

app.use("/", (req, res) => {
  res.json("root");
});

//global middleware

app.use((req, res) => {
  console.log(1);

  res.json("global");
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
