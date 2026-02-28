# TypeScript Generics

## What is a Generic?

A **generic** lets you write a function, class, or interface that works with **any type** while still being **type-safe**. Instead of hardcoding a type like `string` or `number`, you use a **type placeholder** (usually `T`) that gets filled in when the function is called.

> Think of `T` as a variable, but for types instead of values.

---

## Generic Functions

```ts
// Without generics — loses type info
function wrapInArray(item: any): any[] {
  return [item]; // TypeScript has no idea what's inside
}

// With generics — type is preserved
function wrapInArray<T>(item: T): T[] {
  return [item];
}
```

When you call it, TypeScript **infers** `T` automatically:

```ts
wrapInArray("masala"); // T = string  → returns string[]
wrapInArray(42); // T = number  → returns number[]
wrapInArray({ flavor: "Ginger" }); // T = { flavor: string } → returns that[]
```

You can also pass multiple type parameters:

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

pair("chai", 20); // returns [string, number]
pair(true, "yes"); // returns [boolean, string]
```

---

## Generic Interface

An interface can also use a type parameter, making it reusable for different types:

```ts
interface Box<T> {
  content: T;
}

const numberBox: Box<number> = { content: 10 };
const stringBox: Box<string> = { content: "10" };
```

Here `T` is supplied at usage time — same interface, different shapes.

---

## Constraints — `extends` with Generics

By default, `T` can be literally **any type** — which means you can't safely call methods or access properties on it, because TypeScript doesn't know what it will be. **Constraints** let you tell TypeScript: _"T can be anything, but it must at least have these properties."_ You do this using `extends`.

> Think of it as: "I don't care what exact type you pass, as long as it has what I need."

You can **restrict** what types `T` can be using `extends`:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length; // ✅ safe — T is guaranteed to have .length
}

getLength("masala"); // ✅ string has .length
getLength([1, 2, 3]); // ✅ array has .length
getLength(42); // ❌ Error — number has no .length
```

---

## Default Type Parameter

You can provide a **default** for `T` if none is supplied:

```ts
interface Box<T = string> {
  content: T;
}

const b: Box = { content: "hello" }; // T defaults to string
```

---

## Where Generics Are Most Used in Real Projects

| Use Case                       | Example                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| **API response wrappers**      | `ApiResponse<T>` — wraps any data shape returned from an API |
| **React `useState`**           | `useState<User \| null>(null)` — typed state                 |
| **Utility functions**          | `getFirst<T>(arr: T[]): T` — array helpers                   |
| **Repository/Service pattern** | `Repository<T>` — CRUD operations for any entity             |
| **Form handling libraries**    | `useForm<FormData>()` — typed form fields                    |
| **Generic components (React)** | `List<T>` — reusable list component for any item type        |

The most common pattern you'll see in real codebases:

```ts
// API wrapper — used everywhere
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
const res: ApiResponse<User[]> = await fetchUsers();
res.data; // typed as User[]
```

---

## Key Takeaways

1. `<T>` is a **type placeholder** — filled in at call/usage time.
2. TypeScript usually **infers** `T` — you rarely need to pass it explicitly.
3. Use `extends` to **constrain** what types are allowed.
4. Most commonly seen in **API wrappers, utility functions, and framework APIs** (React, Angular, etc.).
5. When you see `<T>`, `<A, B>`, or `<T extends Something>` — it's a generic.
