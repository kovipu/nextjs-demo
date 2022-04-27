# nextjs-demo

Next.js is a full-stack framework of the future.
This is a quick demo of Next.js for a tech talk.

For this demo you will need
* A computer
* Node.js 16<

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

Install node-pg by running `npm install pg pg-native`

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
import db from '../../_db';

export default async function handler(req, res) {
  const data = await db.query('SELECT * from friend;');

  res.status(200).json(data.rows);
}
```

Now we can create a page that requests data from this API route.
Create a file `pages/api-route.js` and add the following:
```
import { useState, useEffect } from 'react';

export default function ApiRoute() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setFriends(data));
  }, [])

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

## Custom Next functions for data fetching

Next adds very unique functions that can be used to run code on the server-side.
Depending on your choice, the code can be run either at build time or run time.

Create a file `pages/static-props.js` with the following content:
```
import db from '../_db';

export default function StaticProps({ friends }) {
  return (
    <div>
      <h1>Static Props example</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await db.query('SELECT * FROM friend;');

  return {
    props: {
      friends: data.rows
    },
  };
}
```

We should now have a new page at `/static-props` with the outcome!

You can also do the same with the difference of replacing
`getStaticProps` with `getServerSideProps`.

## React Server Components

React Server Components allow us to render everything, including the components
themselves, on the server. This is fundamentally different from server-side 
rendering where you're pre-generating HTML on the server.

Make sure we have the canary version of Next installed.
```
npm install next@canary
```

Enable React Server Components by adding the following to your `next.config.js`:
```
module.exports = {
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  },
}
```

Rename `pages/static-props.js` to `pages/static-props.server.js` and see what happens.
React Server Components are a new feature introduced in React 18 and even newer to Next.js.
Not mature.

## WIP: Middleware

Middleware enables you to use code over configuration. This gives you full 
flexibility in Next.js, because you can run code before a request is completed. 
Based on the user's incoming request, you can modify the response by rewriting, 
redirecting, adding headers, or even streaming HTML.

Place the following in `pages/_middleware.js`
```
import { NextResponse } from 'next/server';

export function middleware(req, ev) {
  console.log("received request: ", req);

  return NextResponse.next();
}
```