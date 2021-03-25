import { Sequelize } from 'sequelize';
import express from "express";
let databaseFilename = './tests/mock.json'
let mockData = require(databaseFilename);

const app = express();
app.use(express.json());
let inMemoryStore = [];

app.get("/categories", (_req: express.Request, res: express.Response) => {
  res.send(mockData.categories);
});

app.get('/categories/:id', (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id) -1
  res.send(mockData.categories[id])
});

app.post("/categories", (req: any, res: any) => {
  let inputJson = req.body;

  inMemoryStore = Object.values(mockData.categories);
  let newId = inMemoryStore.length + 1

  inputJson.id = newId
  inMemoryStore.push(inputJson)
  res.sendStatus(201)
});

app.patch("/categories/:id", (req: any, res: any) => {
  let inputJson = req.body;
  let id = parseInt(req.params.id) -1

  for(var key in inputJson)
    mockData.categories[id][key] = inputJson[key]

  inMemoryStore = Object.values(mockData.categories);

  res.json(inMemoryStore[id])
});

app.delete("/categories/:id", (req: any, res: any) => {
  let id = parseInt(req.params.id) -1
  
  if (mockData.categories[id] == null)
    res.sendStatus(404)
  else {
    mockData.categories.splice(id,1)
    inMemoryStore = Object.values(mockData.categories);
    res.json(inMemoryStore[id])
  }
});
app.get("/titles", (_req: express.Request, res: express.Response) => {
  res.send(mockData.titles);
});

app.get('/titles/:id', (req: express.Request, res: express.Response) => {
  
  let id = parseInt(req.params.id) -1
  res.send(mockData.titles[id])

});

//TODO: isn't adding id if it's not specified in the body
app.post("/titles", (req: express.Request, res: express.Response) => { 
  let inputJson = req.body;

  inMemoryStore = Object.values(mockData.titles);
  let newId = inMemoryStore.length + 1

  inputJson.id = newId
  inMemoryStore.push(inputJson)
  res.sendStatus(201)
});

app.patch("/titles/:id", (req: express.Request, res: express.Response) => {
  let inputJson = req.body;
  let id = parseInt(req.params.id) -1

  for(var key in inputJson)
    mockData.titles[id][key] = inputJson[key]

  inMemoryStore = Object.values(mockData.titles);

  res.json(inMemoryStore[id])
});

app.delete("/titles/:id", (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id) -1
  
  if (mockData.titles[id] == null)
    res.sendStatus(404)
  else {
    mockData.titles.splice(id,1)
    inMemoryStore = Object.values(mockData.titles);
    res.json(inMemoryStore[id])
  }
});

export const createServer = (port?: number) => {
  // Option 1: Passing a connection URI
  const sequelize = new Sequelize('postgres://postgres:postre@localhost:5432/postgres'); // TODO: use process.env for this (use dotenv)
  sequelize.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(e => console.error("Unable to connect to the database:", e));

  const server = app.listen(port, () => {
    // @ts-ignore Express typings are wrong, this value actually does exist
    if (port) {
      // If we want to get the randomly assigned port, use: server.address().port
      console.log(`Example app listening at http://localhost:${port}`);
    }
  });
  return server;
};
