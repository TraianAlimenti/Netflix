require("dotenv").config(); // dotenv does not work with imports

import { Server } from 'http';
import { Sequelize } from "sequelize";
import express, { Request, Response } from "express";
import { loadModelsIntoSequelizeInstance } from './lib/models/index';

const app = express();
app.use(express.json());

// TODO: sanitize input!!!

app.get("/categories", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Categories.findAll();
  res.json(result);
});

app.get("/categories/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Categories.findByPk(id));
});

// TODO: properly type this or don't type at all
app.post("/categories", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').Categories.create(req.body);
  res.sendStatus(201);
});

app.patch("/categories/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').Categories.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/categories/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').Categories.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

app.get("/titles", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Titles.findAll();
  res.json(result);
});

app.get("/titles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Titles.findByPk(id));
});

// TODO: properly type this or don't type at all
app.post("/titles", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').Titles.create(req.body);
  res.sendStatus(201);
});

app.patch("/titles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').Titles.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/titles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').Titles.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

export const createServer = (port?: number) => {
  // Option 1: Passing a connection URI
  if (!process.env.DATABASE_DSN) {
    return Promise.reject(new Error('Missing DATABASE_DSN environment key, exiting.'));
  }
  const dsn = (process.env.NODE_ENV !== 'test' ? process.env.DATABASE_DSN : process.env.TEST_DATABASE_DSN) ?? '';
  const sequelize = new Sequelize(dsn, {
    logging: process.env.NODE_ENV === 'test' ? () => {} : console.log
  });
  return sequelize
    .authenticate()
    .then(() => {
      if (process.env.NODE_ENV !== 'test') {
        console.log("Connection to the database has been established successfully.");
      }
      const models = loadModelsIntoSequelizeInstance(sequelize);
      app.set("sequelizeInstance", sequelize);
      app.set("sequelizeModels", models);
    })
    .then(() => {
      const server = app.listen(port, () => {
        if (port) {
          // If we want to get the randomly assigned port, use: server.address().port
          console.log(`Netflix clone listening at http://localhost:${port}`);
        }
      });
      return { app, server };
    })
    .catch(e => {
      console.error("Unable to connect to the database:", e);
      throw e;
    });
};

export const stopServer = (server: Server) => {
  // Disconnect the database
  app.get('sequelizeInstance').close();
  // Stop the HTTP server
  server.close()
}
