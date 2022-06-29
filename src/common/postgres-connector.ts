import { Pool } from 'pg';

export default new Pool({
  max: 20,
  connectionString: `postgres://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/${process.env.BASE}`,
  idleTimeoutMillis: 30000,
});
