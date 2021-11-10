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

export async function getServerSideProps() {
  const data = await db.query('SELECT * FROM friend;');

  return {
    props: {
      friends: data.rows
    },
  };
}