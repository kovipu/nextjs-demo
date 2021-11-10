import client from '../../_db';

export default async function handler(req, res) {
  const data = await client.query('SELECT * from friend;');

  res.status(200).json(data.rows);
}
