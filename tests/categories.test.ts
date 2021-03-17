import * as jsonServer from "json-server";
import fetch from "node-fetch";
import { copyFileSync, unlinkSync } from "fs";

let server: Express.Application;
const testDataBase = "netflixdb-test.json";

describe("Resources test", () => {
  const url = "http://localhost:3000";

  beforeEach(() => {
    copyFileSync("sample.json", testDataBase); // if this has an error, it will throw automatically
    console.log("dataBase copied");
    });

    const router = jsonServer.router(testDataBase);
    const middlewares = jsonServer.defaults();
    const app = jsonServer.create();
    app.use(middlewares);
    app.use(router);
    server = app.listen(3000, () => {
      console.log("JSON Server is up");
    });
  });

  it("get categories", async () => {
    const response = await fetch(url + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    //expect(data.length).toBe(3);
  });

  it("get single categories", async () => {
    const response = await fetch(url + "/categories/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it("create categories", async () => {
    const response = await fetch(url + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"id": 4,"name": "miniserie"}',
    });

    expect(response.status).toBe(201);
  });

  it("patch categories", async () => {
    const response = await fetch(url + "/categories/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "films"}',
    });
    const data = await response.json();
    expect(response.status).toBe(200);
  });

  it("delete categories", async () => {
    const response = await fetch(url + "/categories/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    try {
      server.close();
      console.log("JSON Server is down");
    } catch (err) {
      console.error(err);
    }

    try {
      unlinkSync(testDataBase);
    } catch (err) {
      console.error(err);
    }
  });
});
