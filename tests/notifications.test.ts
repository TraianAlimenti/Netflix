import Http from 'http';
import fetch from "node-fetch";
import { createServer } from '../server'

const BASE_URL = `http://localhost`;
let TARGET_URL = '';
let server: Http.Server;
const MOCK_FILE = './tests/mock.json';

describe("Resources test", () => {
  const RESOURCE_PROPERTY_NAMES = ['id','name','message'];

  beforeEach(() => {
    server = createServer();
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `${BASE_URL}:${port}`;
  });

  it("get notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(4);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("create notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"name": "NewEpisodes_QueensGambit","message": "New episodes for Queens Gambit"}),
    });

    expect(response.status).toBe(201);
  });

  it("patch notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"message": "One new episode of Breaking Bad"}),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("delete notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    server.close();
  });

});