# The `any` Type – Avoid It

---

## What is `any`?

The `any` type tells TypeScript to **turn off all type checking** for that variable. It can hold anything a string, number, object, array and TypeScript won't complain about any of it.

```ts
let orders = ["12","23", "28","34", "50"];

let currentorder: any;

for (let order of orders) {
  if (order === "28") {
    currentorder = order; // assigned a string
    break;
  }
}

currentorder = 42; // reassigned to a number, TypeScript says nothing ❌
console.log(currentorder);
```

> In plain language: `currentorder` starts as `any`, so TypeScript stops watching it. You can assign a string from the loop, then overwrite it with a number `42` on the next line, and TypeScript won't warn you at all. This defeats the entire purpose of using TypeScript.

---

## Why `any` is Dangerous

| Problem            | Explanation                                              |
| ------------------ | -------------------------------------------------------- |
| No type safety     | Any value can be assigned - TypeScript stops checking    |
| No IDE help        | Editor can't suggest methods or catch mistakes           |
| Silent bugs        | Wrong types sneak through to runtime                     |
| Defeats TypeScript | You lose all the benefits of using TS in the first place |

---

## What to Use Instead

- If the type **isn't known yet**: use `unknown`, it forces you to check the type before using it
- If a variable could be **a few specific types**: use a union type (`string | number`)
- If a function could **return different types**: annotate them explicitly

```ts
// ❌ Avoid
let currentorder: any;

// ✅ Better – be explicit about what it can be
let currentorder: string | number | undefined;
```

---

## What is `unknown`?

> "I don't know what type this variable will be when I initialise it, but I **promise** to figure out the type before I use it."

`unknown` is TypeScript's way of saying: _this value is uncertain right now, but it won't stay uncertain forever_. You can assign anything to it (just like `any`), but TypeScript will **refuse to let you use it** until you narrow the type down first — usually with a `typeof` or `instanceof` check.

```ts
let response: unknown = fetchSomeData(); // could be anything

// ❌ Can't use it directly — TypeScript blocks this:
// console.log(response.toUpperCase()); // Error!

// ✅ Check the type first, then use it safely:
if (typeof response === "string") {
  console.log(response.toUpperCase()); // TypeScript now knows it's a string
}
```

> In plain language: `unknown` is a held promise to TypeScript — "I'll check the type before doing anything with this." It keeps you honest, and TypeScript enforces that promise at compile time.

---

## `any` vs `unknown`

|                         | `any`        | `unknown`                  |
| ----------------------- | ------------ | -------------------------- |
| Can assign anything     | ✅           | ✅                         |
| TypeScript checks usage | ❌ No checks | ✅ Forces type check first |
| Safe to use             | ❌           | ✅                         |

```ts
let value: unknown = "hello";

// Must check type before using it:
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ safe
}
```

> `unknown` is the safe version of `any`. It still accepts any value, but TypeScript won't let you use it until you prove what type it actually is.

---

## Rule of Thumb

> **Never use `any` unless you are migrating legacy JavaScript code and have no other option.** Even then, replace it with proper types as soon as possible.
