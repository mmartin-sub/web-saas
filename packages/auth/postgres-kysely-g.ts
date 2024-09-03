import { KyselyConfig, Kysely, PostgresDialect } from 'kysely';

// import { Pool,QueryResult } from 'pg'
// Switch to neon serveless driver (https://github.com/neondatabase/serverless)
import { Pool, neonConfig } from '@neondatabase/serverless';

// Prisma Kyseley - https://github.com/valtyr/prisma-kysely
// See generator client / provider for more information

  // Create a new PostgreSQL pool
export const pool = new Pool(

    {
    // poolConfig

    // https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
    // Schema component is ignored !
    connectionString: process.env.POSTGRES_URL,
    /*
user: 'your_username',
host: 'your_host',
database: 'your_database',
password: 'your_password',
port: 5432, // default PostgreSQL port
  */
  max: 2,
  connectionTimeoutMillis: 5000,

  // See: https://github.com/brianc/node-postgres/issues/1123

  // Options not supported by Ndeo-pgbouncer setup
 // options: process.env.POSTGRES_URL_SCHEMA ? `-c search_path="${process.env.POSTGRES_URL_SCHEMA}` : '' ,
});

// console.log('check options: ',pool.options);

pool.on('connect', (client) => {
    if (process.env.POSTGRES_URL_SCHEMA) {
        const setsearchpath=`SET search_path = '${process.env.POSTGRES_URL_SCHEMA}';`;
        console.log('check set schema: ', setsearchpath);
        client.query(setsearchpath);
    }

  });

  pool.on('error', (err, client)  => {
    console.log('error DB: ',err);
    });

  const dialectPG = new PostgresDialect({
    pool: pool
  });

// declare function createKysely<T>(kyselyConfig?: Partial<KyselyConfig>): Kysely<T>;

export function createKysely<T>(
    kyselyConfig?: Partial<KyselyConfig>
  ): Kysely<T> {
    return new Kysely<T>({
      ...kyselyConfig,
      dialect:  dialectPG,
    });
  }
