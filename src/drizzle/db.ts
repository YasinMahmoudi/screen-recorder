import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const postgress = neon(process.env.POSTGRES_URL!);

export const db = drizzle({ client: postgress });
