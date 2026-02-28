# TypeScript Tuples

## What is a Tuple?

A **tuple** is like an array but with restrictions:
- Fixed number of elements
- Each element has a **specific type** at a **specific position**
- Order matters — types are tied to their index

```ts
let chaiTuple: [string, number];
chaiTuple = ["Masala", 20];   // ✅ valid
chaiTuple = [20, "Masala"];   // ❌ Error — wrong order
```

> Think of a tuple as a typed, fixed-length array where position determines the type.

---

## Optional Parameters in Tuples

Tuple elements can be made **optional** using `?`. Optional elements must come at the **end**.

```ts
let userInfo: [string, number, boolean?];
userInfo = ["hitesh", 100];         // ✅ boolean omitted
userInfo = ["hitesh", 100, true];   // ✅ boolean included
```

- Optional elements are `undefined` when not provided.
- You cannot have a required element after an optional one.

---

## Readonly Tuples

Marking a tuple as `readonly` prevents any modification after initialization.

```ts
const location: readonly [number, number] = [28.66, 32.22];

location[0] = 10;     // ❌ Error — cannot assign to readonly
location.push(99);    // ❌ Error — push not allowed on readonly tuple
```

- Use `readonly` tuples when the data should never change (e.g., coordinates, RGB values).
- Works well with `const` declarations for full immutability.

---

## Named Tuples

Named tuples give **labels** to each position, improving readability without changing runtime behavior.

```ts
const chaiItems: [name: string, price: number] = ["", 0];
```
- The names are purely cosmetic, you can not access them to add value or access data. 
- Names are purely for **documentation/IDE hints** — they don't affect how the tuple works.
- Useful when the tuple purpose isn't obvious from types alone.

```ts
// Without names — unclear what each value means
type Point = [number, number];

// With names — self-documenting
type NamedPoint = [x: number, y: number];

const p: NamedPoint = [10, 20];
```

---

## Destructuring Tuples

Tuples can be destructured just like arrays:

```ts
const [name, price] = chaiItems;
console.log(name);   // ""
console.log(price);  // 0
```

Named tuples make destructuring even more intuitive.

---

## Rest Elements in Tuples

Tuples support **rest elements** for variable-length sections:

```ts
type StringsAndNumber = [...string[], number];
const data: StringsAndNumber = ["a", "b", "c", 42]; // ✅
```

- Rest elements can appear at the start, middle (with care), or end.
- The rest element must be an array type.

---

## Tuple vs Array

| Feature          | Array               | Tuple                        |
|------------------|---------------------|------------------------------|
| Length           | Variable            | Fixed (unless rest elements) |
| Type per index   | Uniform type        | Different type per position  |
| Order matters    | No                  | Yes                          |
| Optional items   | N/A                 | Supported with `?`           |
| Named elements   | No                  | Yes                          |

---

## Common Use Cases

- **Function return values** — return multiple typed values without a full object:
  ```ts
  function getUser(): [string, number] {
    return ["hitesh", 25];
  }
  ```
- **Coordinates/Geo data** — `readonly [number, number]`
- **CSV-like rows** — fixed schema per row
- **React `useState`** — internally returns a tuple `[value, setter]`

---

## Key Takeaways

1. Tuples are arrays with **type and position restrictions**.
2. Use `?` for **optional** elements (at the end only).
3. Use `readonly` to **prevent mutation**.
4. Use **named tuples** for self-documenting code.
5. Tuples support **destructuring** and **rest elements**.
