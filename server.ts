import express from "express";
const mockData = require('./tests/mock.json');

const app = express();
let inMemoryStore = [];

app.get("/categories", (_req: express.Request, res: express.Response) => {
  res.send(mockData.categories);
});

app.get("/categories/:id", (req: express.Request, res: express.Response) => {
  console.log(req.params);
  res.send(mockData.categories);
});

app.post("/categories", (req: any, res: any) => {
  res.status(201);
});

export const createServer = (port?: number) => {
  const server = app.listen(port, () => {
    // @ts-ignore Express typings are wrong, this value actually does exist
    console.log(`Example app listening at http://localhost:${port ?? server.address().port}`);
  });
  return server;
};