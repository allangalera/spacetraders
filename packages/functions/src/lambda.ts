import { ApiHandler } from "sst/node/api";
import { Time } from "@spacetraders/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
});
