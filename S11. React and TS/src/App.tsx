import "./App.css";
import { Counter } from "./components/Counter.tsx";

import type { Chai } from "./types.ts";
import { ChaiList } from "./components/ChaiList.tsx";
import { OrderForm } from "./components/OrderForm.tsx";
import { Card } from "./components/Card.tsx";

const menu: Chai[] = [
  { id: 1, name: "Masala", price: 35 },
  { id: 2, name: "Ginger", price: 20 },
  { id: 3, name: "Dum", price: 15 },
  { id: 4, name: "Elaichi", price: 35 },
  { id: 5, name: "Irani", price: 20 },
];

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <ChaiList items={menu} />
      <Counter />
      <div>
        <OrderForm
          onSubmit={(order) =>
            console.log(
              `Order for ${order.cups} cups of ${order.name} placed successfully`,
            )
          }
        />
      </div>
      <div>
        <Card
          title="Mayank Tea Stall"
          footer={<div> All rights with Mayank</div>}
        />
      </div>
    </>
  );
}

export default App;
