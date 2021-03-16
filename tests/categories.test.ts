const fetch = require("node-fetch");
const jsonServer = require("json-server");

describe("Resources test", () => {
  const url = "http://localhost:3000";
  const testDataBase = "netflixdb-test.json";
  const server = jsonServer.create();
  const router = jsonServer.router(testDataBase);
  const middlewares = jsonServer.defaults();

  beforeEach(() => {
    server.use(middlewares);
    server.use(router);
    server.listen(3000, () => {
      console.log("JSON Server is running");
    });
  });

  it("get categories", async () => {
    const response = await fetch(url + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
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
    const response = await fetch(url + "/categories/4", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "miniseries"}',
    });
    const data = await response.json();
    expect(response.status).toBe(200);
  });

  it("delete categories", async () => {
    const response = await fetch(url + "/categories/4", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "miniseries"}',
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    server.listen().close();
  });
});
