# Section 5 – Union Types

---

## 1. Union Types (`|`)

A **union type** allows a variable to hold more than one type. You use the `|` (pipe) symbol to say "this can be _either_ X _or_ Y".

### Basic Union – Number or String

```ts
let subs: number | string = "1M";
subs = 1000000; // ✅ valid – number
subs = "1M"; // ✅ valid – string
```

> In plain language: `subs` can be a number like `1000000` or a string like `'1M'`. TypeScript is happy with either. Without the union type, you'd have to pick just one.

---

### Literal Union Types

You can restrict a variable to a **specific set of exact values** using literal union types. 

```ts
let apiRequestStatus: "pending" | "success" | "error" = "pending";
```

> In plain language: `apiRequestStatus` is only allowed to hold one of three exact strings — `'pending'`, `'success'`, or `'error'`. If you try to assign anything else, TypeScript will immediately flag an error.

#### What happens when you break the rule:

```ts
apiRequestStatus = "done"; // ❌ Error!
// Type '"done"' is not assignable to type '"pending" | "success" | "error"'
```

> TypeScript catches this right in your editor - before the code even runs — because `"done"` was never listed as an allowed value. This is extremely useful for things like API states, status flags, or any field that should only ever be one of a known set of values.

---

## Summary

| Concept       | Syntax                   | Purpose                  |
| ------------- | ------------------------ | ------------------------ |
| Union type    | `string \| number`       | Allow multiple types     |
| Literal union | `'pending' \| 'success'` | Restrict to exact values |
