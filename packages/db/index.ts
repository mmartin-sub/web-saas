// import { createKysely } from "@vercel/postgres-kysely";
import { createKysely } from "./../auth/postgres-kysely-g";
import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

export const db = createKysely<DB>();
