import { createServer } from "./server";
import env from "@hwei/env";

env.initializeApp();

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
