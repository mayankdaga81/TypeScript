# Arrays in TypeScript

---

## 1. Array Type Syntax — `type[]`

To type an array, write the **element type followed by `[]`**. This tells TypeScript what kind of values the array can hold. The type can be any built-in primitive or a custom type.

```ts
// Built-in types
const chaiFlavours: string[] = ["masala", "ginger", "lemon"];
const ratings: number[] = [4, 5, 3, 5];
const flags: boolean[] = [true, false, true];

console.log(chaiFlavours); // ['masala', 'ginger', 'lemon']
console.log(ratings); // [4, 5, 3, 5]
```

> `string[]` means: _"an array where every element must be a string."_
> TypeScript will error if you try to push a number into a `string[]`.

---

## 2. Alternative Syntax — `Array<type>`

`Array<type>` is the **generic syntax** for the same thing. Both are identical — use whichever reads more clearly to you.

```ts
// Equivalent to string[] and number[]
const chaiFlavours: Array<string> = ["masala", "ginger", "lemon"];
const rating: Array<number> = [4, 5, 3];

// Works with custom types too
type Chai = { name: string; price: number };
const menu: Array<Chai> = [
  { name: "Masala", price: 15 },
  { name: "Adrak", price: 25 },
];
```

> **When to use `Array<T>` over `T[]`?**
>
> - `T[]` is shorter and more common for simple types
> - `Array<T>` is preferred when the type itself is complex, e.g. `Array<string | number>` vs `(string | number)[]`

---

## 3. Array of Objects

Use a custom `type` or `interface` as the element type to get a **typed array of objects**. Every item in the array must match that shape — TypeScript will catch any missing or wrong properties.

```ts
type Chai = {
  name: string;
  price: number;
};

const menu: Chai[] = [
  { name: "Masala", price: 15 },
  { name: "Adrak", price: 25 },
];

// menu.push({ name: "Lemon" }); // ❌ Error: missing 'price'
// menu.push({ name: "Lemon", price: "30" }); // ❌ Error: price must be number

console.log(menu);
// [ { name: 'Masala', price: 15 }, { name: 'Adrak', price: 25 } ]
```

---

## 4. `readonly` Array — Immutable After Initialization

Prefix the type with `readonly` to prevent any mutation of the array after it is created. No `push`, `pop`, `splice`, or index reassignment is allowed.

```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];

// cities.push("Mumbai");  // ❌ Error: Property 'push' does not exist on readonly array
// cities[0] = "Chennai";  // ❌ Error: Index signature is read-only
// cities.pop();           // ❌ Error

console.log(cities); // ['Delhi', 'Jaipur']
```

> Alternative syntax using `ReadonlyArray<T>`:
>
> ```ts
> const cities: ReadonlyArray<string> = ["Delhi", "Jaipur"];
> ```

> **Note:** `readonly` is a **compile-time** check only — the JavaScript output is a plain array with no freeze. Use `Object.freeze()` if you need true runtime immutability.

---

## 5. 2D Arrays (Nested Arrays)

Add `[][]` to represent an array of arrays. The first `[]` is the outer array, the second `[]` is each inner array.

```ts
const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(table[0]); // [1, 2, 3]
console.log(table[1][2]); // 6

// Alternative syntax
const grid: Array<Array<number>> = [
  [1, 2, 3],
  [4, 5, 6],
];
```

---

## 6. Union Type Arrays

An array can hold multiple types using a union. Wrap the union in parentheses before `[]`.

```ts
const mixed: (string | number)[] = ["masala", 25, "ginger", 30];

// Without parentheses — means something different!
// string | number[]  → either a string OR an array of numbers ❌
// (string | number)[] → array of strings OR numbers ✅

console.log(mixed); // ['masala', 25, 'ginger', 30]
```

---

## Summary — Array Type Cheatsheet

| Syntax                 | Meaning                            |
| ---------------------- | ---------------------------------- |
| `string[]`             | Array of strings                   |
| `Array<string>`        | Same as above (generic syntax)     |
| `Chai[]`               | Array of `Chai` objects            |
| `readonly string[]`    | Immutable array of strings         |
| `number[][]`           | 2D array of numbers                |
| `(string \| number)[]` | Array with string or number values |
