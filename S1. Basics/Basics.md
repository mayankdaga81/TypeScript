# Section 1 – TypeScript Basics

## JavaScript vs TypeScript

---

## JavaScript (Basic.js)

```js
function greet(name) {
  return ("hello, ", name);
}

console.log(greet(1));
```

### JS Issues

#### 1. Documentation Without Types

- JS doesn't tell you what type variables should be (string, number, etc.)
- You have to write comments to explain what types are expected
- People often forget to update docs when code changes
- No automatic checking that docs match the actual code

#### 2. IDE Doesn't Help Much

- Your code editor can't give you good suggestions without type hints
- Mistakes only show up when you **run** the code, not while writing
- You have to test everything manually to find bugs
- No warnings before you accidentally pass the wrong type to a function

#### 3. What TypeScript Adds to JavaScript

- **Types**: You specify what type each variable should be (`string`, `number`, `boolean`)
- **Early error catching**: Mistakes show up _before_ you run the code
- **Better IDE support**: Editor suggests correct methods and properties
- **Consistent code**: Types force everyone to use the same conventions
- **Catches bugs while coding**: Not waiting until production to find issues

> **Example from above:** `greet()` should take a string but was passed a number (`1`).  
> TypeScript would immediately warn:  
> `Error: Argument of type 'number' is not assignable to parameter of type 'string'`  
> JavaScript just runs it and creates a bug that users find later.

---

## TypeScript (Basic.ts)

### How Types Are Added in TypeScript

The syntax `name: string` tells TypeScript that `name` must be a string. This is called a **type annotation**.

```ts
function greet1(name: string) {
  return `Hello ${name}`;
}

console.log(greet1("Mayank"));
```

### Why This Is Better Than the JS Version

|               | JavaScript              | TypeScript                    |
| ------------- | ----------------------- | ----------------------------- |
| Type safety   | ❌ Accepts any type     | ✅ Only accepts declared type |
| Error timing  | Runtime (after running) | Compile-time (before running) |
| IDE support   | Limited                 | Full auto-complete & hints    |
| Documentation | Manual comments         | Types serve as live docs      |

#### 1. Type Safety

- If you try `greet1(1)`, TypeScript shows an error **before** running code
- You can only pass a `string`, not a number or other type

#### 2. Better Code

- Uses template literals (backticks) instead of incorrect concatenation
- Cleaner syntax and correct string output

#### 3. IDE Help

- Code editor knows `name` is a string and suggests string methods
- Auto-complete works better with type information

#### 4. Clear Documentation

- Anyone reading the code sees exactly what type is expected
- No guessing or reading separate comments

---

## Key Takeaway

TypeScript is JavaScript with a **type system** layered on top. It catches type-related bugs at development time rather than at runtime, leading to safer and more maintainable code.
