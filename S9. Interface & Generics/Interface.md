# TypeScript Interfaces

## What is an Interface?

An **interface** defines the **shape** of an object — what properties it must have and what types they must be. It's a contract that says: _"anything using this interface must look like this."_

> Main goal: Give a consistent shape/structure to your objects and classes.

Interfaces exist **only at compile time** — they are completely erased in the compiled JavaScript output.

---

## 1. Interface with Objects

The most common use — define what an object must look like.

```ts
interface Shop {
  readonly id: number; // cannot be changed after assignment
  name: string;
}

const s: Shop = { id: 1, name: "Chaicode Caffe" };

s.name = "New Name"; // ✅ allowed
s.id = 2; // ❌ Error — id is readonly
```

**Optional properties** with `?`:

```ts
interface Shop {
  readonly id: number;
  name: string;
  location?: string; // optional — may or may not be present
}

const s: Shop = { id: 1, name: "Chaicode" }; // ✅ location omitted
```

> Use `readonly` for values that identify the object and should never change (like IDs).

---

## 2. Interface with Functions

An interface can describe the **signature of a function** — what parameters it takes and what it returns.

```ts
interface DiscountCalculator {
  (price: number): number;
}

const apply50: DiscountCalculator = (p) => p * 0.5;
const apply20: DiscountCalculator = (p) => p * 0.8;

console.log(apply50(100)); // 50
console.log(apply20(100)); // 80
```

> This is useful when you want to ensure multiple functions follow the exact same shape — like a strategy pattern.

---

## 3. Interface with Methods

Interfaces can define methods that an object or class must implement.

```ts
interface ChaiMaker {
  name: string;
  make(type: string): void; // method signature
  getPrice(type: string): number; // must return number
}

const myMaker: ChaiMaker = {
  name: "Hitesh",
  make(type) {
    console.log(`Making ${type} chai`);
  },
  getPrice(type) {
    return type === "masala" ? 20 : 15;
  },
};
```

You can also define methods using arrow function syntax in the interface:

```ts
interface ChaiMaker {
  make: (type: string) => void;
}
```

Both styles are equivalent for objects. (There is a subtle difference with `this` in classes, but ignore that for now.)

---

## 4. Index Signatures

An **index signature** lets you define an interface where you don't know the exact property names in advance, but you know the **type of the keys and values**.

```ts
interface ChaiRatings {
  [flavor: string]: number;
}

const ratings: ChaiRatings = {
  masala: 4.5,
  ginger: 4.5,
  lemon: 3.8,
  // you can add any string key with a number value
};
```

> `flavor` is just a label for readability — it doesn't restrict what the actual keys can be. Any string key is allowed, and its value must be a `number`.

**Mixing known properties with index signatures:**

```ts
interface ChaiRatings {
  default: number; // known property — must also be a number (consistent with index signature)
  [flavor: string]: number;
}
```

> If you mix a named property with an index signature, the named property's type must be compatible with the index signature's value type.

---

## 5. Declaration Merging (Automatic Interface Merging)

TypeScript has a unique feature: **you can declare the same interface multiple times** and TypeScript will automatically **merge** them into one.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

// TypeScript merges both — User now has name AND age
const u: User = {
  name: "Hitesh",
  age: 25, // ✅ both required
};
```

> This is why `const u: User = { name: "HITesh" }` in the screenshot errors — the merged `User` requires both `name` and `age`.

**When is this useful?**

- Extending third-party library types without modifying their source
- Adding properties to built-in types like `Window` or `Request`

```ts
// Extend Express's Request to include a user object
interface Request {
  user?: User;
}
```

> **Note:** Only interfaces support declaration merging. `type` aliases do **not** merge — re-declaring a `type` is a compile error.

---

## 6. Interface Extends

An interface can **extend** one or more other interfaces, inheriting all their properties and adding new ones.

```ts
interface A {
  a: string;
}
interface B {
  b: string;
}

interface C extends A, B {} // C has both a and b

const obj: C = {
  a: "hello",
  b: "world",
};
```

You can also extend and add new properties:

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const d: Dog = { name: "Bruno", breed: "Labrador" };
```

> `extends` is used for interface-to-interface inheritance. For class-to-interface, use `implements`.

---

## 7. Interface vs Type Alias — When to Use Which

Both `interface` and `type` can describe object shapes. Here's when to pick one over the other:

| Feature               | `interface` | `type`               |
| --------------------- | ----------- | -------------------- |
| Object shape          | ✅          | ✅                   |
| Function type         | ✅          | ✅                   |
| Extend/inherit        | `extends`   | `&` (intersection)   |
| Declaration merging   | ✅ Yes      | ❌ No                |
| Union types           | ❌          | ✅ `type A = B \| C` |
| Computed/mapped types | ❌          | ✅                   |
| Primitives, tuples    | ❌          | ✅                   |

**General rule:**

- Use **`interface`** for objects and classes — it's more extendable and supports merging.
- Use **`type`** when you need unions, intersections, tuples, or mapped types.

---

## 8. Interface with Classes (`implements`)

A class can promise to fulfill an interface using `implements`. TypeScript then checks the class has everything the interface requires.

```ts
interface Brewable {
  name: string;
  brew(): void;
}

class Chai implements Brewable {
  name = "Masala Chai";

  brew() {
    console.log(`Brewing ${this.name}`);
  }
}
```

A class can implement **multiple interfaces**:

```ts
class FancyChai implements Brewable, Describable {
  // must satisfy both interfaces
}
```

> `implements` is a compile-time check only — it doesn't add any runtime behavior.

---

## Key Takeaways

1. Interfaces define the **shape/contract** of objects, functions, and classes.
2. Use `readonly` for properties that shouldn't change after assignment.
3. Use `?` for optional properties.
4. **Index signatures** allow dynamic keys with a fixed value type.
5. **Declaration merging** — same interface declared twice → TypeScript merges them automatically.
6. **`extends`** — interface can inherit from multiple other interfaces.
7. **`implements`** — a class fulfills an interface's contract.
8. Prefer `interface` for objects/classes; prefer `type` for unions, tuples, and mapped types.
