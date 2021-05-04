import { Server } from "http";
import fetch from "node-fetch";
import { createServer, stopServer } from "../server";
import mockData from "./mock";

let TARGET_URL = "";
let server: Server;
const headers = { "Content-type": "application/json; charset=UTF-8" };

describe("Titles", () => {
  const RESOURCE_PROPERTY_NAMES = [
    "id",
    "title",
    "categoryId",
    "logo",
    "synopsis",
    "showInformation",
    "pg",
    "trailer",
    "createdAt",
    "updatedAt"
  ];

  beforeAll(async () => {
    const result = await createServer();
    if (!result) {
      throw new Error(
        "Error while booting Titles -> beforeAll: Server could not be started"
      );
    }
    server = result.server;
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `http://127.0.0.1:${port}`;
  });

  it("create titles", async () => {
    const response = await fetch(TARGET_URL + "/titles/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: "RussianDoll",
        categoryId: 1,
        logo: "url to a logo",
        synopsis: "Some related info about this serie",
        showInformation: "some important info about this serie",
        pg: "16",
        trailer: "link to the video"
      })
    });
    expect(response.status).toBe(201);
  });

  it("get titles", async () => {
    mockData.titles.forEach(async title => {
      await fetch(TARGET_URL + "/titles/", {
        method: "POST",
        headers,
        body: JSON.stringify(title)
      });
    });
    const response = await fetch(TARGET_URL + "/titles");
    const data = await response.json();
    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(5);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single title", async () => {
    await fetch(TARGET_URL + "/titles/", {
      method: "POST",
      headers,
      body: JSON.stringify(mockData.titles[0])
    });
    const response = await fetch(TARGET_URL + "/titles/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("patch titles", async () => {
    await fetch(TARGET_URL + "/titles/", {
      method: "POST",
      headers,
      body: JSON.stringify(mockData.titles[2])
    });
    const response = await fetch(TARGET_URL + "/titles/3", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ pg: "11", title: "new title" })
    });
    expect(response.status).toBe(200);
  });

  it("delete title", async () => {
    const response = await fetch(TARGET_URL + "/titles/3", {
      method: "DELETE",
      headers
    });

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    stopServer(server);
  });
});
