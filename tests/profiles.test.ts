import Http from 'http';
import fetch from "node-fetch";
import { createServer } from '../server'

const BASE_URL = `http://localhost`;
let TARGET_URL = '';
let server: Http.Server;
const MOCK_FILE = './tests/mock.json';

describe("Resources test", () => {
  const RESOURCE_PROPERTY_NAMES = ['id','userId','name'];

  beforeEach(() => {
    server = createServer();
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `${BASE_URL}:${port}`;
  });

  it("get profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("create profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"id": 4,"name": "miniserie"}),
    });

    expect(response.status).toBe(201);
  });

  it("patch profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"name": "pepito"}),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("delete profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    server.close();
  });

});