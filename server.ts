require("dotenv").config(); // dotenv does not work with imports

import { Server } from 'http';
import { Sequelize } from "sequelize";
import express, { Request, Response } from "express";
import { loadModelsIntoSequelizeInstance } from './lib/models/index';

let databaseFilename = "./tests/mock.json";
let mockData = require(databaseFilename);

const app = express();
app.use(express.json());
let inMemoryStore = [];

app.get("/categories", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Categories.findAll();
  res.send(result);
});

app.get("/categories/:id", (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  res.send(mockData.categories[id]);
});

app.post("/categories", (req: any, res: any) => {
  let inputJson = req.body;

  inMemoryStore = Object.values(mockData.categories);
  let newId = inMemoryStore.length + 1;

  inputJson.id = newId;
  inMemoryStore.push(inputJson);
  res.sendStatus(201);
});

app.patch("/categories/:id", (req: any, res: any) => {
  let inputJson = req.body;
  let id = parseInt(req.params.id) - 1;

  for (var key in inputJson) mockData.categories[id][key] = inputJson[key];

  inMemoryStore = Object.values(mockData.categories);

  res.json(inMemoryStore[id]);
});

app.delete("/categories/:id", (req: any, res: any) => {
  let id = parseInt(req.params.id) - 1;

  if (mockData.categories[id] == null) res.sendStatus(404);
  else {
    mockData.categories.splice(id, 1);
    inMemoryStore = Object.values(mockData.categories);
    res.json(inMemoryStore[id]);
  }
});
app.get("/titles", (_req: Request, res: Response) => {
  res.send(mockData.titles);
});

app.get("/titles/:id", (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  res.send(mockData.titles[id]);
});

//TODO: isn't adding id if it's not specified in the body
app.post("/titles", (req: Request, res: Response) => {
  let inputJson = req.body;

  inMemoryStore = Object.values(mockData.titles);
  let newId = inMemoryStore.length + 1;

  inputJson.id = newId;
  inMemoryStore.push(inputJson);
  res.sendStatus(201);
});

app.patch("/titles/:id", (req: Request, res: Response) => {
  let inputJson = req.body;
  let id = parseInt(req.params.id) - 1;

  for (var key in inputJson) mockData.titles[id][key] = inputJson[key];

  inMemoryStore = Object.values(mockData.titles);

  res.json(inMemoryStore[id]);
});

app.delete("/titles/:id", (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;

  if (mockData.titles[id] == null) res.sendStatus(404);
  else {
    mockData.titles.splice(id, 1);
    inMemoryStore = Object.values(mockData.titles);
    res.json(inMemoryStore[id]);
  }
});

export const createServer = (port?: number) => {
  // Option 1: Passing a connection URI
  if (!process.env.DATABASE_DSN) {
    return Promise.reject(new Error('Missing DATABASE_DSN environment key, exiting.'));
  }
  const sequelize = new Sequelize(process.env.DATABASE_DSN);
  return sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      const models = loadModelsIntoSequelizeInstance(sequelize);
      app.set("sequelizeInstance", sequelize);
      app.set("sequelizeModels", models);
    })
    .then(() => sequelize.sync({ force: true }))
    .then(() =>
      app.listen(port, () => {
        // @ts-ignore Express typings are wrong, this value actually does exist
        if (port) {
          // If we want to get the randomly assigned port, use: server.address().port
          console.log(`Example app listening at http://localhost:${port}`);
        }
      })
    )
    .catch(e => {
      console.error("Unable to connect to the database:", e);
      return false;
    });
};

export const stopServer = (server: Server) => {
  // Disconnect the database
  app.get('sequelizeInstance').close();
  // Stop the HTTP server
  server.close()
}
