import fetch from "node-fetch";
import { createServer, stopServer } from '../server'
import { Server } from 'http'

const BASE_URL = `http://localhost`;
let TARGET_URL = '';
let server: Server;

describe.skip("Titles", () => {
  const RESOURCE_PROPERTY_NAMES = ['id','title','categoryId','logo','synopsis','showInformation','pg','trailer'];

  beforeEach(async () => {
    const serverInstance = await createServer();
    if (!serverInstance) {
      throw new Error('Error while booting Categories -> beforeEach: Server could not be started');
    }
    server = serverInstance.server;
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `${BASE_URL}:${port}`;
  });

  it("get titles", async () => {
    const response = await fetch(TARGET_URL + "/titles");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(5);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single titles", async () => {
    const response = await fetch(TARGET_URL + "/titles/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("create titles", async () => {
    const response = await fetch(TARGET_URL + "/titles/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"title": "RussianDoll","categoryId": 1,"logo": "url to a logo","synopsis": "Some related info about this serie","showInformation": "some important info about this serie","pg": "16","trailer": "link to the video"}),
    });

    expect(response.status).toBe(201);
  });

  it("patch titles", async () => {
    const response = await fetch(TARGET_URL + "/titles/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"pg": "11","trailer": "another link"}),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("delete titles", async () => {
    const response = await fetch(TARGET_URL + "/titles/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(async () => {
    // @ts-ignore TODO: Fix this typing
    stopServer(server);
  });

});
