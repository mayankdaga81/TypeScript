import { useState } from "react";

export function Counter() {
  // In the example below, we have used TS in the state.
  // We have defined the state type to be number in this case, and thus TS will now make sure taht we always initialise the state count with numbers.
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Cups ordered : {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Order one more</button>
    </div>
  );
}
