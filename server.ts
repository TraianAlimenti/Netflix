import express from "express";
const bodyParser = require('body-parser')
let databaseFilename = './tests/mock.json'
let mockData = require(databaseFilename);

const app = express();
app.use(bodyParser.json());
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
  let newMockData = require(databaseFilename);
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

app.get("/users", (_req: express.Request, res: express.Response) => {
  res.send(mockData.users);
});

app.get('/users/:id', (req: express.Request, res: express.Response) => {
  
  let id = parseInt(req.params.id) -1
  res.send(mockData.users[id])

});

//TODO: isn't adding id if it's not specified in the body
app.post("/users", (req: express.Request, res: express.Response) => { 
  let inputJson = req.body;

  inMemoryStore = Object.values(mockData.users);
  let newId = inMemoryStore.length + 1

  inputJson.id = newId
  inMemoryStore.push(inputJson)
  res.sendStatus(201)
});

app.patch("/users/:id", (req: express.Request, res: express.Response) => {
  let inputJson = req.body;
  let id = parseInt(req.params.id) -1

  for(var key in inputJson)
    mockData.users[id][key] = inputJson[key]

  inMemoryStore = Object.values(mockData.users);

  res.json(inMemoryStore[id])
});

app.delete("/users/:id", (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id) -1
  
  if (mockData.users[id] == null)
    res.sendStatus(404)
  else {
    mockData.users.splice(id,1)
    inMemoryStore = Object.values(mockData.users);
    res.json(inMemoryStore[id])
  }
});

export const createServer = (port?: number, newDatabaseFilename?: string) => {
  if (newDatabaseFilename != undefined) 
    databaseFilename = newDatabaseFilename

  mockData = require(databaseFilename);
  const server = app.listen(port, () => {
    // @ts-ignore Express typings are wrong, this value actually does exist
    console.log(`Example app listening at http://localhost:${port ?? server.address().port}`);
  });
  return server;
};