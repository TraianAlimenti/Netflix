import { Server } from 'http';
import fetch from "node-fetch";
import { createServer, stopServer } from '../server'
import faker from 'faker';

let TARGET_URL = '';
let server: Server;

describe("Rate limit test", () => {

    beforeAll(async () => {
        const result = await createServer();
        if (!result) {
          throw new Error('Error while booting Categories -> beforeAll: Server could not be started');
        }
        server = result.server;
        // @ts-ignore Because the typescript typings for this are incorrect
        const port = server?.address()?.port;
        TARGET_URL = `http://127.0.0.1:${port}`;
      });

  it("Send multiple requests", async () => {  
    let response
    const model = faker.random.arrayElement(['/categories','/titles','/notifications','/profileNotifications','/profiles'])
    for (let i=0; i<10; i++)
      response = await fetch(TARGET_URL + model);
    expect(response?.statusText).toStrictEqual('Too Many Requests');
    expect(response?.status).toBe(429);
  });

  afterAll(async () => {
    stopServer(server);
  });
});
