# Type Narrowing

> Once TypeScript knows the **specific type** of a variable inside a block, you can safely access type-specific methods on it.

---

## 1. `typeof` Narrowing

Use `typeof` to split behavior based on type.

```ts
function getChai(kind: string | number) {
  if (typeof kind === "string") {
    return `Making ${kind} chai...`; // ✅ string methods available here
  }
  return `Chai order: ${kind}`; // kind is number here
}

console.log(getChai("masala")); // Making masala chai...
console.log(getChai(3)); // Chai order: 3
```

> Inside the `if`, TypeScript **narrows** `kind` from `string | number` down to just `string`.

---

## 2. Truthiness Narrowing

Use a plain `if(variable)` to check if an optional value was actually passed.

```ts
// msg?: string  → the ? means the parameter is optional (can be string or undefined)
function serveChai(msg?: string) {
  if (msg) {
    return `Serving ${msg}`; // msg is string here — undefined is filtered out
  }
  return `Serving default masala chai`;
}

console.log(serveChai("ginger")); // Serving ginger
console.log(serveChai()); // Serving default masala chai
```

> `msg?` is shorthand for `msg: string | undefined`. The truthy check narrows it to just `string`.

---

## 3. Exhaustive Checks

When a parameter accepts multiple specific values, handle each case explicitly. The fallback return covers remaining types.

```ts
function orderChai(size: "small" | "medium" | "large" | number) {
  if (size === "small") return `small cutting chai...`;
  if (size === "medium" || size === "large") return `make extra chai`;
  return `chai order #${size}`; // only number reaches here
}

console.log(orderChai("small")); // small cutting chai...
console.log(orderChai("large")); // make extra chai
console.log(orderChai(42)); // chai order #42
```

---

## 4. Type Guards (Custom `is` Predicates)

A **type guard** is a function that checks if an unknown object matches a specific type. Used heavily for API responses.

```ts
// Using "type" keyword, we have created a custom Data type, which is an Object with the mentioned keys.
type ChaiOrder = {
  type: string;
  sugar: number;
};

// "obj is ChaiOrder" is the return type — it's a type predicate
function isChaiOrder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    typeof obj.sugar === "number"
  );
}

// Use obj is Type only in validator/guard functions that take any/unknown and check the shape at runtime.
// For normal functions that already know what they return, just use the return type directly.
```

> The return type `obj is ChaiOrder` tells TypeScript: _if this function returns true, treat `obj` as `ChaiOrder` from that point on._

### Using the Guard

```ts
function serveOrder(item: ChaiOrder | string) {
  if (isChaiOrder(item)) {
    return `Serving ${item.type} chai with ${item.sugar} sugar`; // ✅ item is ChaiOrder
  }
  return `Serving custom chai: ${item}`; // item is string here
}

console.log(serveOrder({ type: "masala", sugar: 2 })); // Serving masala chai with 2 sugar
console.log(serveOrder("elaichi special")); // Serving custom chai: elaichi special
```

---

## 5. Discriminated Unions

Give each type a unique literal `type` field. TypeScript can then narrow automatically using that field.

```ts
type MasalaChai = { type: "masala"; spicelevel: number };
type GingerChai = { type: "ginger"; amount: number };
type ElaichiChai = { type: "elaichi"; aroma: number };

type Chai = MasalaChai | GingerChai | ElaichiChai;
```

> The `type` field acts as a **tag**. Every member of the union has a different literal value for it, so TypeScript can tell them apart.

### Switch on the Discriminant

```ts
function MakeChai(order: Chai) {
  switch (order.type) {
    case "masala":
      return `Masala chai with spice level ${order.spicelevel}`;
    case "ginger":
      return `Ginger chai with ${order.amount}g ginger`;
    case "elaichi":
      return `Elaichi chai with aroma level ${order.aroma}`;
  }
}

console.log(MakeChai({ type: "masala", spicelevel: 3 })); // Masala chai with spice level 3
console.log(MakeChai({ type: "ginger", amount: 5 })); // Ginger chai with 5g ginger
console.log(MakeChai({ type: "elaichi", aroma: 8 })); // Elaichi chai with aroma level 8
```

> Bonus: the IDE **autocompletes** the valid case values (`"elaichi"`, `"ginger"`) because it knows the union — no typos possible.

---

## 6. `instanceof` Narrowing

Use `instanceof` when dealing with **class-based objects** (e.g. `Date`, `Error`, or custom classes). `typeof` is useless here — it just returns `"object"` for all of them.

```ts
function processInput(input: Date | string) {
  if (input instanceof Date) {
    return `Year: ${input.getFullYear()}`; // ✅ Date methods available
  }
  return `Text: ${input.toUpperCase()}`; // input is string here
}

console.log(processInput(new Date("2024-01-15"))); // Year: 2024
console.log(processInput("hello")); // Text: HELLO
```

> `instanceof` checks the **prototype chain** — i.e. was this object created with `new Date()`? If yes, TypeScript narrows it to `Date` and unlocks all its methods.

---

## 7. `in` Operator Narrowing

Use `in` to check if a **property exists** on an object. Useful when you have a union of object types that share no common discriminant field.

```ts
type CuttingChai = { teaspoons: number };
type MasalaChai = { spicelevel: number };

function prepareChai(chai: CuttingChai | MasalaChai) {
  if ("teaspoons" in chai) {
    return `Cutting chai with ${chai.teaspoons} tsp`; // ✅ narrowed to CuttingChai
  }
  return `Masala chai, spice: ${chai.spicelevel}`; // narrowed to MasalaChai
}

console.log(prepareChai({ teaspoons: 2 })); // Cutting chai with 2 tsp
console.log(prepareChai({ spicelevel: 5 })); // Masala chai, spice: 5
```

> `"teaspoons" in chai` narrowed the type without needing a shared `type` tag. Lighter than writing a full type guard function.

---

## Summary

| Technique           | How                                    | When to Use                             |
| ------------------- | -------------------------------------- | --------------------------------------- |
| `typeof`            | `typeof x === "string"`                | Primitive union types                   |
| Truthiness          | `if (x)`                               | Optional parameters / nullable values   |
| Exhaustive check    | Handle each literal case               | Literal union types                     |
| Type guard (`is`)   | Custom function with `obj is T`        | API responses, unknown objects          |
| Discriminated union | Shared `type` literal field + `switch` | Complex object unions                   |
| `instanceof`        | `x instanceof ClassName`               | Class instances (`Date`, `Error`, etc.) |
| `in`                | `"prop" in obj`                        | Object unions without a discriminant    |
