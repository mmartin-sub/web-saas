import { VercelPostgresPoolConfig } from "@vercel/postgres";
import { Kysely, KyselyConfig } from "kysely";

declare function createKysely<T>(
  poolConfig?: VercelPostgresPoolConfig,
  kyselyConfig?: Partial<KyselyConfig>,
): Kysely<T>;

export { createKysely };
