# nextjs-demo

Next.js is a full-stack framework of the future.
This is a quick demo of Next.js for a tech talk.

For this demo you will need
* A computer
* Node JS 16<

## Initialize a Next.js project

Run this in your projects folder to initialize a new Next application.

```
npx create-next-app nextjs-demo && cd nextjs-demo
```

After this finishes, a simple `npm run dev` will start a dev server.

A few cool things about Next:
* Next makes very few assumptions, ie. your testing library.
* Next has a built in support for CSS modules.
* The routing is generated based on file-system: `pages/about.js` maps to `/about`.


## Set up database to test out different server implementations

Spin up the included database with `docker-compose up`

Install node-pg by running `npm install pg`

Create a file `/_db.js` with the following content:
```
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  password: 'postgres'
});

client.connect();

export default client;
```

## API Routes

API routes provide a solution to build your API with Next.

A file placed in `pages/api/` works like a serverless function instead of a page.
The function is mapped to `/api/[filename]`.

Let's build an API route that queries our friends from the database and returns them as JSON.

Add the following to `pages/api/hello.js`

```
import client from '../../_db';

export default async function handler(req, res) {
  const data = await client.query('SELECT * from friend;');

  res.status(200).json(data.rows);
}
```

Now we can create a page that requests data from this API route.
Create a file `pages/api-route.js` and add the following:
```
import { useState, useEffect } from 'react';

export default function ApiRoute() {
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    const res = await fetch('/api/hello');
    const data = await res.json();
    setFriends(data);
  }, []);

  return (
    <div>
      <h1>API Route example</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.name} {friend.likes_ice_cream ? '🍨🍨🍨' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
Now we should see a new page at `/api-route` showing our implementation!
