const express = require('express');
const mockData = require('./tests/mock.json');

const app = express();
const port = 3000;

app.get("/categories", (req, res) => {
  res.send(mockData.categories);
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});