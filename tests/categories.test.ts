import jsonServer from "json-server";
import fetch from "node-fetch";
import Http from 'http'; // needed to extract the types.
import { copyFileSync, unlinkSync } from "fs";

let server: Http.Server;
const testDatabaseFilename = "./tests/netflixdb-test.json";
const TARGET_URL = "http://localhost:3000";
const MOCK_FILE = './tests/mock.json';

describe("Resources test", () => {

  beforeEach(() => {
    copyFileSync(MOCK_FILE, testDatabaseFilename); // if this has an error, it will throw automatically
    console.log("dataBase copied");

    const router = jsonServer.router(testDatabaseFilename);
    const middlewares = jsonServer.defaults();
    const app = jsonServer.create();
    app.use(middlewares);
    app.use(router);
    server = app.listen(3000, () => {
      console.log("JSON Server is up");
    }); // at this point, server is an http.Server: https://nodejs.org/api/http.html#http_class_http_server
  });

  it("get categories", async () => {
    const response = await fetch(TARGET_URL + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    //expect(data.length).toBe(3);
  });

  it("get single categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it("create categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"id": 4,"name": "miniserie"}',
    });

    expect(response.status).toBe(201);
  });

  it("patch categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "films"}',
    });
    const data = await response.json();
    expect(response.status).toBe(200);
  });

  it("delete categories", async () => {
    const response = await fetch(TARGET_URL + "/categories/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    server.close();
    console.log("JSON Server is down");
    unlinkSync(testDatabaseFilename);
  });

});