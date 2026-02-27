# Types & Interfaces in TypeScript

> Both `type` and `interface` let you describe the **shape** of data. They look similar but have important differences — especially when used with classes.

---

## 1. Defining a Type (Object Shape)

Use `type` to describe the shape of an object and reuse it across multiple functions.

```ts
type ChaiOrder = {
  type: string;
  sugar: number;
  strong: boolean;
};

function makeChai(order: ChaiOrder) {
  console.log(order);
}

function serveChai(order: ChaiOrder) {
  console.log(order);
}

makeChai({ type: "masala", sugar: 2, strong: true });
serveChai({ type: "ginger", sugar: 0, strong: false });
```

> Defining `ChaiOrder` once and reusing it across `makeChai` and `serveChai` keeps the code DRY. If the shape changes, you update it in one place.

---

## 2. `implements` with Classes — Use Interface, NOT Type Union

`implements` enforces that a class follows a specific contract (shape). **It works with interfaces and plain object types, but NOT with union types.**

### ✅ Works — interface with `implements`

```ts
interface TeaRecipe {
  water: number;
  milk: number;
}

class MasalaChai implements TeaRecipe {
  water = 100;
  milk = 50;
}
```

### ✅ Works — interface with union values (the property has a union, not the type itself)

```ts
interface CupSize {
  size: "small" | "large"; // ✅ the interface has a property with union values
}

class Chai implements CupSize {
  size: "small" | "large" = "small";
}
```

### ❌ Fails — `type` with union at the top level

```ts
type CupSize = "small" | "large"; // ❌ this IS a union — not an object shape

class Chai implements CupSize {
  // Error! A class can't implement a union type
}
```

### ❌ Fails — `type` with union of objects

```ts
type Response = { ok: true } | { ok: false }; // ❌ union of two objects

class myRes implements Response {
  // Error! Can't implement a union type
  ok: boolean = true;
}
```

> **Rule:** Classes can only `implements` an interface or a plain object type. If your type is a **union** (`A | B`), TypeScript can't guarantee which branch the class satisfies — so it rejects it. Switch to an `interface` in those cases.

---

## 3. Union Types

Use `|` to allow a variable/parameter to be one of several specific values.

```ts
type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
  console.log(t);
}

orderChai("masala"); // ✅
orderChai("lemon"); // ✅
// orderChai("milk"); // ❌ TypeScript error — "milk" not in TeaType
```

---

## 4. Intersection Types (`&`)

Use `&` to **combine** two types into one. The result must satisfy ALL properties from both types.

```ts
type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type MasalaChai = BaseChai & Extra; // must have BOTH teaLeaves AND masala

const cup: MasalaChai = {
  teaLeaves: 2,
  masala: 1,
};

console.log(cup); // { teaLeaves: 2, masala: 1 }
```

> Think of `|` as **OR** and `&` as **AND**.
>
> - `A | B` → value can be A **or** B
> - `A & B` → value must be A **and** B (has all properties of both)

---

## 5. Optional Properties (`?`)

Add `?` after a property name to make it optional — it becomes `type | undefined`.

```ts
type User = {
  username: string;
  bio?: string; // optional — can be string or undefined
};

const user1: User = { username: "Mayank", bio: "Developer" }; // ✅
const user2: User = { username: "Mayank" }; // ✅ bio is optional

console.log(user1.bio); // "Developer"
console.log(user2.bio); // undefined
```

> Always narrow optional properties before using them:
>
> ```ts
> if (user2.bio) {
>   console.log(user2.bio.toUpperCase()); // ✅ safe
> }
> ```

---

## 6. Readonly Properties

Mark a property as `readonly` to allow it to be set **only once** (at initialization). Any later reassignment is a TypeScript error.

```ts
type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "Masterji",
  version: 1,
};

cfg.version = 2; // ✅ allowed — version is mutable
// cfg.appName = "X";  // ❌ Error: Cannot assign to 'appName' because it is a read-only property
```

> `readonly` is a **compile-time** check only — it has no effect in the compiled JavaScript output. Use it to protect config values, IDs, or anything that should never change after creation.

---

## 7. `type` vs `interface` — When to Use Which

| Feature                | `type`                 | `interface`              |
| ---------------------- | ---------------------- | ------------------------ |
| Object shape           | ✅                     | ✅                       |
| Union types (`\|`)     | ✅                     | ❌                       |
| Intersection (`&`)     | ✅                     | ✅ (via `extends`)       |
| `implements` in class  | ✅ (plain object only) | ✅                       |
| Can be extended/merged | ❌ (no reopening)      | ✅ (declaration merging) |
| Primitive aliases      | ✅ `type ID = string`  | ❌                       |
| Optional & readonly    | ✅                     | ✅                       |

### General Rule of Thumb

- Use **`interface`** when defining contracts for **classes** or **public APIs**
- Use **`type`** when working with **unions, intersections, primitives**, or complex composed types

---

## 8. Bonus — `interface` Extending Another Interface

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = { name: "Bruno", breed: "Labrador" };
console.log(dog); // { name: 'Bruno', breed: 'Labrador' }
```

> `extends` in interfaces is the equivalent of `&` in types — it combines properties from both.
