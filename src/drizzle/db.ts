import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

config({ path: "../../.env" });

const postgress = neon(process.env.POSTGRES_URL!);

export const db = drizzle({ client: postgress });
