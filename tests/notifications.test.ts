import { Server } from "http";
import faker, { random } from 'faker';
import { createServer, stopServer } from "../server";
import fetch from "node-fetch";

let TARGET_URL = "";
let server: Server;
let notifications: {
  id?: number,
  name: string,
  message: string,
}[] = [];
const headers = { "Content-type": "application/json; charset=UTF-8" };

describe("Users", () => {
  const RESOURCE_PROPERTY_NAMES = [
    'id',
    'name',
    'message',
    'createdAt', 
    'updatedAt'
  ];

  beforeAll(async () => {
    const result = await createServer();
    if (!result) {
      throw new Error(
        "Error while booting Profiles -> beforeAll: Server could not be started"
      );
    }
    server = result.server;
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `http://127.0.0.1:${port}`;
  });

  it("create notification", async () => {
    const response = await fetch(TARGET_URL + "/notifications/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: 1, // this could break
        name: faker.datatype.number(100),
        message: faker.random.words()
      })
    });
    expect(response.status).toBe(201);
  });

  it("get notifications", async () => {
    const response = await fetch(TARGET_URL + "/notifications");
    const data = await response.json();
    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    notifications = data;
    expect(data.length).toBeGreaterThan(0);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single profile", async () => {
    const profileId = notifications[notifications.length - 1].id;
    const response = await fetch(`${TARGET_URL}/notifications/${profileId}`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(profileId);
  });

  it("patch profile", async () => {
    const profileId = notifications[notifications.length - 1].id;
    const response = await fetch(`${TARGET_URL}/notifications/${profileId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ name: faker.name.findName(), email: faker.internet.email() })
    });
    expect(response.status).toBe(200);
  });

  it("delete profile", async () => {
    const profileId = notifications[notifications.length - 1].id;
    const response = await fetch(`${TARGET_URL}/notifications/${profileId}`, {
      method: "DELETE",
      headers
    });
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    stopServer(server);
  });
});
