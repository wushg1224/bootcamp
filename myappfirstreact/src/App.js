import UserCard from './UserCard';
import useUser from './useUser';

function App() {
  const { users, setUsers } = useUser();

  return (
    <div>
      {users.map((user, index) => (
        <UserCard key={index} name={user.name} age={user.age} />
      ))}
<button onClick={() => {
        const newUsers = [...users];
        newUsers[0].name = 'Lily Updated';
        setUsers(newUsers);
      }}>Change Name of First User</button>
    </div>
  );
}

export default App;
