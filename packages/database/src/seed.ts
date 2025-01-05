import { db } from "./db";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Elon Musk",
    email: "Elon@mars.republic",
  },
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        db.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch {
    // console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();