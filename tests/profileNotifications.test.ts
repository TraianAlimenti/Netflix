import Http from 'http';
import fetch from "node-fetch";
import { createServer } from '../server'

const BASE_URL = `http://localhost`;
let TARGET_URL = '';
let server: Http.Server;
const MOCK_FILE = './tests/mock.json';

describe("Resources test", () => {
  const RESOURCE_PROPERTY_NAMES = ['id','userId','notificationId','ack'];
  
  beforeEach(() => {
    server = createServer();
    // @ts-ignore Because the typescript typings for this are incorrect
    const port = server?.address()?.port;
    TARGET_URL = `${BASE_URL}:${port}`;
  });

  it("get profileNotifications", async () => {
    const response = await fetch(TARGET_URL + "/profileNotifications");
    const data = await response.json();

    expect(Array.isArray(data)).toEqual(true);
    expect(response.status).toBe(200);
    expect(data.length).toBe(6);
    expect(Object.keys(data[0])).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("get single profileNotifications", async () => {
    const response = await fetch(TARGET_URL + "/profileNotifications/1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
    expect(data.id).toBe(1);
  });

  it("create profileNotifications", async () => {
    const response = await fetch(TARGET_URL + "/profileNotifications/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"userId": 3,"notificationId": 1,"ack": false}),
    });

    expect(response.status).toBe(201);
  });

  it("patch profileNotifications", async () => {
    const response = await fetch(TARGET_URL + "/profileNotifications/3", {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({"ack": true}),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(data)).toStrictEqual(RESOURCE_PROPERTY_NAMES); // check that we only have the required fields.
  });

  it("delete profileNotifications", async () => {
    const response = await fetch(TARGET_URL + "/profileNotifications/3", {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    expect(response.status).toBe(200);
  });

  afterEach(() => {
    server.close();
  });

});