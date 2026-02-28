# TypeScript Enums

## What is an Enum?

An **enum** (enumeration) is a way to define a set of **named constants** that restrict what values a variable or parameter can hold.

```ts
enum CupSize {
  SMALL,
  MEDIUM,
  LARGE
}

const size = CupSize.LARGE; // ✅ restricted to only these options
```

> **Standard practice**: enum member names are written in **ALL CAPS**.

---

## Benefit — Type Safety & Autocomplete

The biggest benefit of enums is that TypeScript **knows all possible values** at compile time. This means:
- IDE autocomplete shows only valid options
- Passing an invalid value gives a compile-time error
- The intent of the code is self-documenting

```ts
function setCupSize(size: CupSize) {
  console.log(size);
}

setCupSize(CupSize.LARGE);  // ✅
setCupSize("XL");           // ❌ Error — not a CupSize
```

---

## Numeric Enums — Auto-increment & Drawback

By default, enums are **numeric** and start at `0`, auto-incrementing by 1.

```ts
enum Direction {
  UP,    // 0
  DOWN,  // 1
  LEFT,  // 2
  RIGHT  // 3
}
```

You can set a **custom starting value**, but then all remaining values auto-increment from that point:

```ts
enum Status {
  PENDING   = 100,
  SERVED,   // 101 (auto)
  CANCELLED // 102 (auto)
}
```

> **Drawback**: If you set one value manually in the middle, everything after it shifts. You must be intentional — it's best to either set **all values** or **none** to avoid surprises.

### What about strings — no auto-increment

String enums do **not** auto-increment. Every member **must** be explicitly assigned:

```ts
enum ChaiType {
  MASALA   = "masala",
  GINGER   = "ginger"
  // PLAIN  = ???  ❌ Error if left unassigned after a string member
}
```

TypeScript cannot auto-generate the next string, so all members after a string value must be manually initialized. This makes string enums more **verbose but more readable** in logs/debugging.

---

## String Enums & Function Restriction

String enums are great when used as function parameter types — TypeScript enforces only valid enum values and IDE shows all options:

```ts
enum ChaiType {
  MASALA = "masala",
  GINGER = "ginger"
}

function makeChai(type: ChaiType) {
  console.log(`Making: ${type}`);
}

makeChai(ChaiType.GINGER);   // ✅ — IDE autocompletes GINGER | MASALA
makeChai("masala");          // ❌ Error — must use ChaiType.MASALA
```

This is especially useful in large codebases where you want to ensure only specific strings flow through.

---

## Const Enum

Adding `const` before `enum` causes TypeScript to **inline** the values at compile time instead of generating a JavaScript object. The result is smaller, faster output.

```ts
const enum Sugars {
  LOW    = 1,
  MEDIUM = 2,
  HIGH   = 3
}

const s = Sugars.HIGH; // compiles to: const s = 3;
```

- No JavaScript object is generated at runtime — the value is substituted directly.
- **Not used often** because it can cause issues when enums are shared across modules or used with `isolatedModules`.
- Use when performance matters and the enum is only used within the same file.

---

## Enum vs Union Type — When to Use Which?

This is a common question. You can achieve similar restrictions with a **union type**:

```ts
let name: "Mayank" | "B" | "C";
```

So why use enum at all?

| Feature | Union Type | Enum |
|---|---|---|
| Syntax | Inline, lightweight | Separate declaration |
| Reusability | Must repeat everywhere | Define once, use anywhere |
| Autocomplete | ✅ | ✅ |
| Refactoring | Change in many places | Change in one place |
| Runtime value | Not a JS construct | Exists as JS object (unless `const enum`) |
| Readable logs | Shows raw string | Shows raw value too |
| Iteration | ❌ Not possible | ✅ Can loop over members |

**Use a union type when:**
- The set of values is small and used in 1-2 places
- You want lightweight, inline types
- You don't need to iterate over values

**Use an enum when:**
- The set of values is reused across many files/functions
- You want a single source of truth that's easy to refactor
- You need to iterate over all possible values
- The values carry semantic meaning beyond their raw string/number

---

## Reverse Mapping (Numeric Enums Only)

Numeric enums support **reverse mapping** — you can look up the name from the value:

```ts
enum Status {
  PENDING = 100,
  SERVED,
  CANCELLED
}

console.log(Status[100]); // "PENDING"
console.log(Status[101]); // "SERVED"
```

String enums do **not** support reverse mapping.

---

## Key Takeaways

1. Enums **restrict choices** and improve autocomplete/type safety.
2. Use **ALL CAPS** for enum member names by convention.
3. Numeric enums **auto-increment** — be careful when setting custom values mid-enum.
4. String enums require **all members to be explicitly assigned** (no auto-increment).
5. Use `const enum` for inlined, zero-cost values (with caveats).
6. Prefer **enum over union** when values are reused widely or need iteration.
7. Only numeric enums support **reverse mapping**.
