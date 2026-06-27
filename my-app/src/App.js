import './App.css';
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button className="my-button" onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  const hasFruit = products.some(p => p.isFruit);

  return (
    <>
      <ul>{listItems}</ul>
      {hasFruit && <p>有水果哦！</p>}
    </>
  );
}

function App() {
  const name = "Ceci";
  const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};
  return (
    <div className="App">
      <header className="App-header">
        <h1>你好，{name}</h1>
        <h1>{user.name}</h1>
        <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
        <MyButton />
        <ShoppingList />
      </header>
    </div>
  );
}

export default App;