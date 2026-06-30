import { useState } from 'react';

function useUser() {
  const [users, setUsers] = useState([
    { name: 'Lily', age: 18 },
    { name: 'Tom', age: 20 }
  ]);

  return { users, setUsers };
}

export default useUser;
