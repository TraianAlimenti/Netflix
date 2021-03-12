const fetch = require("node-fetch");
const spawn = require('child_process').spawn;


//MUST FIND A WAY TO KILL THIS child_process
spawn("json-server", [
  "--watch",
  "./netflixdb.json",
  "--port",
  "3000",
]);

describe("Netflix jest", () => {
  
  var url = "http://localhost:3000";

  it.only("get categories", async () => {
    const response = await fetch(url + "/categories");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(4);
  });

  it.only("get single categories", async () => {
    const response = await fetch(url + "/categories/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it.todo("patch categories");

  it.todo("delete categories");

  it.todo("create categories");

});

