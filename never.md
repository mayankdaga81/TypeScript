# `never` Type in TypeScript

> `never` represents a value that **should never exist** — either because all cases are exhausted, or because the code can never complete.

---

## 1. Exhaustive Checking with Union Types

When you handle **every possible case** of a union type, TypeScript narrows the remaining type to `never`.

```ts
type Role = "admin" | "user" | "superadmin";

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    console.log("Redirecting to admin dashboard");
    return;
  }
  if (role === "user") {
    console.log("Redirecting to user dashboard");
    return;
  }
  if (role === "superadmin") {
    console.log("Redirecting to superadmin dashboard");
    return;
  }

  // At this point, role is `never` — all cases are handled ✅
  // Hovering on `role` here shows: (parameter) role: never
  role;
}
```

> If you hover on `role` after all `if` blocks → TypeScript shows `(parameter) role: never`
> This means: _"every possible value has been handled, nothing can reach here"_

---

## 2. What happens when you add a new type to the union?

If you add `"moderator"` to `Role` but forget to handle it:

```ts
type Role = "admin" | "user" | "superadmin" | "moderator"; // ← new type added

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    return;
  }
  if (role === "user") {
    return;
  }
  if (role === "superadmin") {
    return;
  }

  // Now hovering on `role` shows: (parameter) role: "moderator"
  // ⚠️ TypeScript is hinting — "this case is NOT handled yet!"
  role;
}
```

> **This is the power of `never` as a safety net.**
> As long as it shows `never` → all cases are handled ✅
> The moment it shows an actual type → something is missing ⚠️

### Making it a compile-time error with a helper:

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${value}`);
}

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    return;
  }
  if (role === "user") {
    return;
  }
  if (role === "superadmin") {
    return;
  }

  assertNever(role); // ❌ TypeScript ERROR if "moderator" is unhandled
  // Argument of type '"moderator"' is not assignable to parameter of type 'never'
}
```

> Now forgetting to handle a new union member is a **compile error**, not a runtime bug.

---

## 3. Function that never returns — `: never`

A function returns `never` when it **never completes** — either it loops forever or always throws.

```ts
// Infinite loop — never returns
function neverReturn(): never {
  while (true) {}
}

// Always throws — never returns normally
function throwError(message: string): never {
  throw new Error(message);
}
```

> `void` = function returns but gives back nothing
> `never` = function **never** returns at all

---

## Summary

| Scenario                                | What `never` means                            |
| --------------------------------------- | --------------------------------------------- |
| After exhaustive `if/switch` checks     | All union cases handled — nothing left        |
| Hovering shows actual type, not `never` | A union case is **missing** — fix it!         |
| Function return type `: never`          | Function loops forever or always throws       |
| `assertNever(value: never)`             | Forces compile error when a case is unhandled |
