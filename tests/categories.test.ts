import { Server } from 'http';
import fetch from "node-fetch";
import { createServer, stopServer } from '../server'
import mockData from './mock'

const BASE_URL = `http://localhost`;
let TARGET_URL = '';
let server: Server;

describe("Categories", () => {
  const RESOURCE_PROPERTY_NAMES = ['id','name', 'createdAt', 'updatedAt'];

  beforeEach(async () => {
    const result = await createServer();
    if (!result) {
      throw new Error('Error while booting Categories -> beforeEach: Server could not be started');
    }
    server = result.server;
    const app = result.app;
    
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `${BASE_URL}:${port}`;
    const sequelizeInstance = app.get("sequelizeInstance");
    sequelizeInstance.sync({ force: true });
  });

  it("create categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"id": 4,"name": "miniserie"}),
    });

    expect(response.status).toBe(201);
  });

  it("get categories", async () => {
    // create data
    mockData.categories.forEach(async (category) => {
      await fetch(TARGET_URL + "/categories/", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(category),
      });
    });
    
    const response = await fetch(TARGET_URL + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single category", async () => {
    // create data
    await fetch(TARGET_URL + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(mockData.categories[0]),
    });
    const response = await fetch(TARGET_URL + "/categories/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("patch categories", async () => {
    // create data
    await fetch(TARGET_URL + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(mockData.categories[2]), // id=3
    });
    const response = await fetch(TARGET_URL + "/categories/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"name": "somethingRandom"}),
    });
    expect(response.status).toBe(200);
  });

  it("delete categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    expect(response.status).toBe(204);
  });

  afterEach(async () => {
    stopServer(server);
  });
});