import { Server } from "http";
import faker from 'faker';
import { createServer, stopServer } from "../server";
import fetch from "node-fetch";

let TARGET_URL = "";
let server: Server;
let users: {
  id?: number,
  name: string,
  email: number,
}[] = [];
const headers = { "Content-type": "application/json; charset=UTF-8" };

describe("Users", () => {
  const RESOURCE_PROPERTY_NAMES = [
    'id',
    'name',
    'email',
    'createdAt', 
    'updatedAt'
  ];

  beforeAll(async () => {
    const result = await createServer();
    if (!result) {
      throw new Error(
        "Error while booting Users -> beforeAll: Server could not be started"
      );
    }
    server = result.server;
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `http://127.0.0.1:${port}`;
  });

  it("create user", async () => {
    const response = await fetch(TARGET_URL + "/users/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: 1, // this could break
        name: faker.name.findName(),
        email: faker.internet.email(),
      })
    });
    expect(response.status).toBe(201);
  });

  it("get users", async () => {
    const response = await fetch(TARGET_URL + "/users");
    const data = await response.json();
    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    users = data;
    expect(data.length).toBeGreaterThan(0);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single user", async () => {
    const userId = users[users.length - 1].id;
    const response = await fetch(`${TARGET_URL}/users/${userId}`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(userId);
  });

  it("patch user", async () => {
    const userId = users[users.length - 1].id;
    const response = await fetch(`${TARGET_URL}/users/${userId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ name: faker.name.findName(), email: faker.internet.email() })
    });
    expect(response.status).toBe(200);
  });

  it("delete user", async () => {
    const userId = users[users.length - 1].id;
    const response = await fetch(`${TARGET_URL}/users/${userId}`, {
      method: "DELETE",
      headers
    });
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    stopServer(server);
  });
});
