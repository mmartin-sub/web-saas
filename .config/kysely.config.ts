import {
  DummyDriver,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
  // see https://github.com/kysely-org/kysely-ctl for extra reference about the options

  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: {
    createAdapter() {
      return new PostgresAdapter();
    },
    createDriver() {
      return new DummyDriver();
    },
    createIntrospector(db) {
      return new PostgresIntrospector(db);
    },
    createQueryCompiler() {
      return new PostgresQueryCompiler();
    },
  },
  //   migrations: {
  //     migrationFolder: "migrations",
  //   },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
