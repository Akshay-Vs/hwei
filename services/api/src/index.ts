import env from "@hwei/env";
import log from "npmlog";
import { createServer } from "./server";

env.loadEnv();

const port = process.env.PORT || 8080;
const server = createServer();

server.listen(port, () => {
  log.info("API", `api running on ${port}`);
});
