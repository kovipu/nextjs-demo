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