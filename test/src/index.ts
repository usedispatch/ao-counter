import aos from "./aos";
import fs from "fs";
import path from "node:path";
import assert from "node:assert";
import { describe, test, before } from "node:test";

describe("Counter Tests", () => {
  let env: aos;

  before(async () => {
    const source = fs.readFileSync(
      path.join(__dirname, "../../process/build/output.lua"),
      "utf-8"
    );
    env = new aos(source);
    await env.init();
  });

  test("should initialize counter at 0", async () => {
    const response = await env.send({ Action: "getCounter" });
    assert.equal(response.Messages[0].Data, 0);
  });

  test("should increment counter", async () => {
    const response = await env.send({ Action: "incrementCounter" });
    assert.equal(response.Messages[0].Data, 1);
  });

  test("should decrement counter", async () => {
    const response = await env.send({ Action: "decrementCounter" });
    assert.equal(response.Messages[0].Data, 0);
  });

  test("should handle multiple increments", async () => {
    await env.send({ Action: "incrementCounter" });
    await env.send({ Action: "incrementCounter" });
    const response = await env.send({ Action: "getCounter" });
    assert.equal(response.Messages[0].Data, 2);
  });

  test("should handle multiple decrements", async () => {
    await env.send({ Action: "decrementCounter" });
    await env.send({ Action: "decrementCounter" });
    const response = await env.send({ Action: "getCounter" });
    assert.equal(response.Messages[0].Data, 0);
  });

  test("should allow negative numbers", async () => {
    await env.send({ Action: "decrementCounter" });
    const response = await env.send({ Action: "getCounter" });
    assert.equal(response.Messages[0].Data, -1);
  });
});
