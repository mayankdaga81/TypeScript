# `implements` in TypeScript

`class abc implements xyz` means that class `abc` **must fulfill the contract defined by interface (or type) `xyz`**.

## How it works

`xyz` is typically an **interface** that declares a set of properties/methods. When a class `implements` it, TypeScript enforces that the class contains **all** those members — otherwise it's a compile-time error.

```ts
interface xyz {
  name: string;
  greet(): void;
}

class abc implements xyz {
  name = "Mayank"; // required
  greet() {
    // required
    console.log("Hello!");
  }
}
```

If `abc` is missing `name` or `greet`, TypeScript will throw an error like:

> _Class 'abc' incorrectly implements interface 'xyz'. Property 'greet' is missing._

---

## Key Points

| Concept                       | Detail                                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| `implements` enforces         | The **shape/contract** (what must exist)                           |
| `implements` does NOT provide | Any actual implementation or code                                  |
| A class can implement         | **Multiple** interfaces: `class abc implements xyz, pqr`           |
| The interface itself          | Is erased at runtime — it's purely a TypeScript compile-time check |

---

## `implements` vs `extends`

- **`extends`** → inherits **implementation** (code) from a parent class
- **`implements`** → promises to satisfy a **contract** defined by an interface — you write all the code yourself

```ts
class abc extends Base implements xyz { ... }  // both are valid together
```

> In short: `implements` is TypeScript's way of saying _"I guarantee this class has everything `xyz` requires."_
