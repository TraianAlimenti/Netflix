require("dotenv").config(); // dotenv does not work with imports

import { Server } from 'http';
import { Sequelize } from "sequelize";
import express, { Request, Response } from "express";
import { loadModelsIntoSequelizeInstance } from './lib/models/index';
import limiter from './lib/models/ratelimit';

const getTestDatabase = () => {
  if (!process.env.DATABASE_DSN) {
    return;
  }
  const splitted = process.env?.DATABASE_DSN.split('/');
  const currentDatabase = splitted[splitted.length-1];
  //const mainDatabase = `/${currentDatabase[currentDatabase.length-1]}`;
  const mainDatabase = `/${currentDatabase}`;
  return process.env?.DATABASE_DSN.replace(mainDatabase,'/test');
}

const app = express();
app.use(express.json());
app.use(limiter);

app.get("/categories", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Categories.findAll();
  res.json(result);
});

app.get("/categories/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Categories.findByPk(id));
});

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

app.get("/users", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Users.findAll();
  res.json(result);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Users.findByPk(id));
});

app.post("/users", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').Users.create(req.body);
  res.sendStatus(201);
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').Users.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').Users.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

app.get("/profiles", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Profiles.findAll();
  res.json(result);
});

app.get("/profiles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Profiles.findByPk(id));
});

app.post("/profiles", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').Profiles.create(req.body);
  res.sendStatus(201);
});

app.patch("/profiles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').Profiles.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/profiles/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').Profiles.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

app.get("/notifications", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').Notifications.findAll();
  res.json(result);
});

app.get("/notifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').Notifications.findByPk(id));
});

app.post("/notifications", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').Notifications.create(req.body);
  res.sendStatus(201);
});

app.patch("/notifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').Notifications.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/notifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').Notifications.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

app.get("/profileNotifications", async (_req: Request, res: Response) => {
  const result = await app.get('sequelizeModels').ProfileNotifications.findAll();
  res.json(result);
});

app.get("/profileNotifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  res.json(await app.get('sequelizeModels').ProfileNotifications.findByPk(id));
});

app.post("/profileNotifications", async (req: Request, res: Response) => {
  await app.get('sequelizeModels').ProfileNotifications.create(req.body);
  res.sendStatus(201);
});

app.patch("/profileNotifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  await app.get('sequelizeModels').ProfileNotifications.update(
    req.body,
    { where: { id } }
  );
  res.sendStatus(200);
});

app.delete("/profileNotifications/:id", async (req: Request, res: Response) => {
  let id = parseInt(req.params.id) - 1;
  await app.get('sequelizeModels').ProfileNotifications.destroy(
    { where: { id } }
  );
  res.sendStatus(204);
});

export const createServer = (port?: number) => {
  // Option 1: Passing a connection URI
  if (!process.env.DATABASE_DSN) {
    return Promise.reject(new Error('Missing DATABASE_DSN environment key, exiting.'));
  }
  const TEST_DATABASE_DSN = getTestDatabase();
  const dsn = (process.env.NODE_ENV !== 'test' ? process.env.DATABASE_DSN : TEST_DATABASE_DSN) ?? '';
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
