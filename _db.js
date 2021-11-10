import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  password: 'postgres'
});

client.connect();

export default client;