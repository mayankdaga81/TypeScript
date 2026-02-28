# Objects in TypeScript

---

## 1. Typing an Object — Inline vs `type` / `interface`

When you write `let tea: { name: string; price: number }`, the `let` is just the **variable declaration** keyword — it has nothing to do with types. The type is the `{ ... }` part written after the `:`.

```ts
// ✅ Inline — type written directly on the variable
let tea: {
  name: string;
  price: number;
  isHot: boolean;
};

tea = { name: "Ginger Tea", price: 25, isHot: true };
console.log(tea); // { name: 'Ginger Tea', price: 25, isHot: true }
```

> This is valid, but **not reusable**. If you need the same shape in multiple places, pull it into a `type` or `interface` instead (see Section 3).

---

## 2. Duck Typing (Structural Typing)

TypeScript uses **structural typing** — it doesn't care about the variable name or where the object came from. It only checks: _"does this object have the required properties with the right types?"_

If an object has **more** properties than required, TypeScript still accepts it — the extra properties are simply ignored.

```ts
type Cup = { size: string };

let smallCup: Cup = { size: "200ml" }; // ✅ exact match

let bigCup = { size: "500ml", material: "steel" }; // bigCup has an extra property

smallCup = bigCup; // ✅ No error! bigCup has "size: string" — that's all Cup needs
console.log(smallCup); // { size: '500ml', material: 'steel' }
```

> **Duck typing:** _"If it walks like a duck and quacks like a duck, it's a duck."_
> `bigCup` satisfies the `Cup` contract because it has `size: string`. The extra `material` property doesn't break anything.

### ⚠️ Exception — Object Literals are Strictly Checked

```ts
// ❌ This DOES error — TypeScript checks object literals strictly
smallCup = { size: "500ml", material: "steel" }; // Error: 'material' does not exist in type 'Cup'
```

> TypeScript applies **excess property checking** only on direct object literals, not on variables. Assigning via a variable (like `bigCup`) bypasses this check.

---

## 3. Code Clarity — Define Types Separately

Inline types get messy for complex objects. Define them separately with `type` or `interface` and reuse.

```ts
type Item = { name: string; quantity: number };
type Address = { street: string; pin: number };

type Order = {
  id: string;
  items: Item[]; // array of Item type
  address: Address; // nested type
};

const order: Order = {
  id: "ORD001",
  items: [
    { name: "Masala Chai", quantity: 2 },
    { name: "Ginger Tea", quantity: 1 },
  ],
  address: { street: "MG Road", pin: 411001 },
};

console.log(order);
```

> Nested types (`Item[]`, `Address`) keep each type small and focused — classic **single responsibility**.

---

## 4. `Partial<T>` — Make All Properties Optional

`Partial<T>` is a **utility type** that takes a type and makes every property optional. Useful for update functions where you only want to pass the fields being changed.

```ts
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

// Without Partial — you'd have to pass all 3 fields every time ❌
// With Partial — pass only what you want to update ✅
function updateChai(updates: Partial<Chai>){
  console.log("updating chai with", updates);
};

updateChai({ price: 25 }); // ✅ only price
updateChai({ isHot: false }); // ✅ only isHot
updateChai({}); // ✅ empty — no error, but risky!
```

> **Risk:** `Partial` allows empty objects `{}`. If your update function blindly applies changes, an empty object could silently do nothing. Always validate or combine with other checks in real code.

---

## 5. `Required<T>` — Make All Properties Mandatory

The opposite of `Partial`. `Required<T>` strips all `?` from a type — every property must be provided.

```ts
type ChaiOrder = {
  name?: string;
  quantity?: number;
};

// All optional in ChaiOrder, but placeOrder needs everything filled
const placeOrder = (order: Required<ChaiOrder>) => {
  console.log(order);
};

placeOrder({ name: "Masala Chai", quantity: 2 }); // ✅
// placeOrder({ name: "Masala Chai" });            // ❌ quantity is required here
```

> Use `Required` at the boundary where optional data must be complete — e.g. before saving to a database or calling an API.

---

## 6. `Pick<T, K>` — Select Specific Properties

`Pick` creates a **new type** with only the properties you choose from an existing type.

```ts
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

// Only want name and price from Chai
type BasicChaiInfo = Pick<Chai, "name" | "price">;

const chaiInfo: BasicChaiInfo = {
  name: "Lemon Tea",
  price: 30,
};
// chaiInfo.isHot       // ❌ doesn't exist on BasicChaiInfo
// chaiInfo.ingredients // ❌ doesn't exist on BasicChaiInfo

console.log(chaiInfo); // { name: 'Lemon Tea', price: 30 }
```

> `Pick` is great for API responses — send only what the client needs, not the entire internal object.

---

## 7. `Omit<T, K>` — Exclude Specific Properties

The opposite of `Pick`. `Omit` creates a new type with everything **except** the properties you list.

```ts
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

// Everything except ingredients
type ChaiWithoutIngredients = Omit<Chai, "ingredients">;

const publicChai: ChaiWithoutIngredients = {
  name: "Masala Chai",
  price: 20,
  isHot: true,
};

console.log(publicChai); // { name: 'Masala Chai', price: 20, isHot: true }
```

> Use `Omit` when you want to **hide sensitive or internal fields** — e.g. omit `password` or `internalId` before sending a user object to the frontend.

---

## 8. `Readonly<T>` — Freeze All Properties

Makes every property in a type `readonly` — none can be reassigned after initialization.

```ts
type Config = {
  appName: string;
  version: number;
};

const cfg: Readonly<Config> = {
  appName: "Masterji",
  version: 1,
};

// cfg.version = 2;   // ❌ Error: Cannot assign to 'version' — it is read-only
console.log(cfg); // { appName: 'Masterji', version: 1 }
```

> Use `Readonly` for config objects, constants, or any data that should never be mutated after creation.

---

## Summary — Utility Types Cheatsheet

| Utility       | What it does             | Example               |
| ------------- | ------------------------ | --------------------- |
| `Partial<T>`  | All properties optional  | Update functions      |
| `Required<T>` | All properties mandatory | Pre-save validation   |
| `Pick<T, K>`  | Keep only selected keys  | API response shaping  |
| `Omit<T, K>`  | Remove selected keys     | Hide sensitive fields |
| `Readonly<T>` | All properties read-only | Config, constants     |

> All of these are **non-destructive** — they create a NEW type, the original `type`/`interface` is unchanged.
