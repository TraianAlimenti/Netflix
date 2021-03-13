const fetch = require("node-fetch");
const spawn = require("child_process").spawn;

describe("Resources test", () => {
  var url = "http://localhost:3000";
  var jsonServer

  beforeEach( async () => {
    //MUST FIND A WAY TO KILL THIS child_process
    jsonServer = await spawn("json-server", [
      "--watch",
      "netflixdb.json",
      "--port",
      "3000",
    ]);
  });

  it.only("get categories", async () => {
    const response = await fetch(url + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
    //console.log("Test passed - List of categories retrieved");
  });

  it.skip("get single categories", async () => {
    const response = await fetch(url + "/categories/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
    //console.log("Test passed - single categorie retrieved");
  });

  it.skip("create categories", async () => {
    const response = await fetch(url + "/categories/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"id": 4,"name": "miniserie"}',
    });

    expect(response.status).toBe(201);
  });

  it.skip("patch categories", async () => {
    const response = await fetch(url + "/categories/4", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "miniseries"}',
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    //console.log("Test passed - Patch of categorie succesfuly done");
  });

  it.skip("delete categories", async () => {
    const response = await fetch(url + "/categories/4", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: '{"name": "miniseriesss"}',
    });

    expect(response.status).toBe(200);
  });

  afterEach( async () => {
    //this is working but should resolve how to wait until db is up
    //jsonServer.kill()
  });
});