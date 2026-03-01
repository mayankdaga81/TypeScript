// The name of the interface is just the function name with "Props" in it.
// This is a standard practice, and it is not mandatory.

import { useState } from "react";

// In OrderFormProps, we have an onSubmit method of return type void.
// Next, we will have a data bject, which will have name and cups (These 2 are like form fields).
interface OrderFormProps {
  onSubmit(order: { name: string; cups: number }): void;
}

// This function will have onSubmit method, which is of type. OrderFormProps.
export function OrderForm({ onSubmit }: OrderFormProps) {
  // Added the type of the props as well, so more safety.
  const [name, setName] = useState<string>("Masala");
  const [cups, setCups] = useState<number>(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ name, cups });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Chai Name</label>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <label>Cups</label>
      <input
        value={cups}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCups(Number(e.target.value))
        }
      />
      <button type="submit">Place order! </button>
    </form>
  );
}

// Note -
// 1 - In the onChange property, we have added the type of e, which is React.ChangeEvent, and then we even specified, what type of ChangeEvent, which is HTMLInputElement.
// Is it mandatory? No - Our code will work fine even without this, but this is added for safety
