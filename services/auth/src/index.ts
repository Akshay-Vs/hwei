import { app } from "./app"
import { env } from "./env";

const port = env.AUTH_PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});