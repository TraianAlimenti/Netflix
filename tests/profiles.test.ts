import { Server } from "http";
import faker, { random } from 'faker';
import { createServer, stopServer } from "../server";
import fetch from "node-fetch";

let TARGET_URL = "";
let server: Server;
let profiles: {
  id?: number,
  userId: string,
  name: string,
}[] = [];
const headers = { "Content-type": "application/json; charset=UTF-8" };

describe("Users", () => {
  const RESOURCE_PROPERTY_NAMES = [
    'id',
    'userId',
    'name',
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

  it("create profile", async () => {
    const response = await fetch(TARGET_URL + "/profiles/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: 1, // this could break
        userId: faker.datatype.number(100),
        name: faker.name.findName(),
      })
    });
    expect(response.status).toBe(201);
  });

  it("get profiles", async () => {
    const response = await fetch(TARGET_URL + "/profiles");
    const data = await response.json();
    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    profiles = data;
    expect(data.length).toBeGreaterThan(0);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single profile", async () => {
    const profileId = profiles[profiles.length - 1].id;
    const response = await fetch(`${TARGET_URL}/profiles/${profileId}`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(profileId);
  });

  it("patch profile", async () => {
    const profileId = profiles[profiles.length - 1].id;
    const response = await fetch(`${TARGET_URL}/profiles/${profileId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ name: faker.name.findName(), email: faker.internet.email() })
    });
    expect(response.status).toBe(200);
  });

  it("delete profile", async () => {
    const profileId = profiles[profiles.length - 1].id;
    const response = await fetch(`${TARGET_URL}/profiles/${profileId}`, {
      method: "DELETE",
      headers
    });
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    stopServer(server);
  });
});
