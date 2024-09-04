import { createKysely, pool } from "./postgres-kysely-g";
import type { GeneratedAlways } from "kysely";
import { KyselyConfig, Kysely,PostgresDialect } from 'kysely';

import { QueryResult } from 'pg'

// See for reference: https://authjs.dev/getting-started/adapters/kysely

// This adapter exports a wrapper of the original `Kysely` class called `KyselyAuth`,
// that can be used to provide additional type-safety.
// While using it isn't required, it is recommended as it will verify
// that the database interface has all the fields that Auth.js expects.
import { KyselyAuth } from "@auth/kysely-adapter"

// See: https://authjs.dev/guides/role-based-access-control
interface Database {
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    role: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}

// Function to log the default configuration and dialect setup
function reportKyselyConfig(db: Kysely<Database>) {

//  console.log('DB Connection: ',db.connection.toString);
 // console.log('DB schema: ',db.schema);

}


// export const db = new KyselyAuth<Database>({
// Not working, compiler error
const kyselyConfig:Partial<KyselyConfig>=
(process.env.IS_DEBUG === "true") ?
  {
    log: ['query', 'error'],

  }
/*
  log(event): void {
    if (event.level === 'query') {
      console.log(event.query.sql)
      console.log(event.query.parameters)
    }
  }
*/
: {
};

export const db = createKysely<Database>(
  kyselyConfig
  // It is a vercel Postgresql pooling, not sure how it works with other DBs
  // See: https://www.npmjs.com/package/@vercel/postgres-kysely
  // and: https://github.com/vercel/storage/tree/main/packages/postgres-kysely

);
//reportKyselyConfig(db);


// console.log('connect string: ', process.env.POSTGRES_URL);

/*
* Example running query

async function performAdvancedQuery(): Promise<QueryResult<Database["User"]>> {
  try {
      // Acquire a connection from the pool
      const connection = await pool.connect();

      // Execute a complex query involving JOIN, subquery, and aggregation
      const query = `
      SELECT *
      FROM "User" u
      `;

      // Execute the query
      const result = await connection.query<Database["User"]>(query);

      // Release the connection back to the pool
      connection.release();

      // Return the query result
      return result;
  } catch (error) {
      console.error('Error executing query:', error);
      throw error;
  }
  }

  // Usage
performAdvancedQuery()
.then((queryResult) => {
  console.log('Query result:', queryResult.rows);
})
.catch((error) => {
  console.error('Error:', error);
});

*/
