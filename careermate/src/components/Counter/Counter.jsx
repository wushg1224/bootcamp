//import css file
import "./Counter.css";

//import useState hook
import { useState } from "react";
import { useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("updated Count:", count);
  }, [count]);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
    console.log("Count:", count);
  }

  return (
    <div className="counter">
      <h1>Counter</h1>
      <h2 className="count">{count}</h2>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
