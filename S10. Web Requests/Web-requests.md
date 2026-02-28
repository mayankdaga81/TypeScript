# TypeScript — Web Requests & API Calls

## 1. Installing Types for a Library

Most JavaScript libraries are written without TypeScript. When you install them, TypeScript has no idea what types their functions return or accept.

To fix this, many libraries ship a separate **types package** under the `@types/` namespace:

```bash
npm i some-library             # install the actual library
npm i -D @types/some-library   # install the TypeScript types (dev dependency only)
```

Examples:

```bash
npm i axios                    # axios ships its own types — no separate install needed
npm i express
npm i -D @types/express        # express needs a separate types package
```

> The `-D` flag installs it as a **dev dependency** — types are only needed during development/compilation, not at runtime.

**How do you know if a library has types built-in?**

- In VS Code, hover over an import — if you see the types, they're included.
- Check the library's `package.json` for a `"types"` or `"typings"` field.
- Check [https://www.npmjs.com/~types](https://www.npmjs.com/~types) or the DefinitelyTyped repo.

---

## 2. `.d.ts` Files — Declaration Files

A `.d.ts` file (**TypeScript Declaration File**) contains **only type information** — no actual JavaScript code. It tells TypeScript what types a library uses without containing any runtime logic.

**When types don't install or exist:**
If a library has no `@types/` package available, you can create your own declaration file:

1. Create a file named `some-library.d.ts` (or `globals.d.ts`) in your project.
2. Add the type declarations manually — you can find these on the library's website or GitHub.

```ts
// some-library.d.ts
declare module "some-library" {
  export function doSomething(value: string): number;
}
```

TypeScript will pick this up automatically and use it for type checking — works exactly the same as an officially published types package.

---

## 3. Making API Calls with TypeScript

### Step 1 — Look at the API response and create an Interface

Always start by inspecting the actual API response (Postman, browser, or docs) and model it as a TypeScript interface.

```ts
// API response from: https://jsonplaceholder.typicode.com/todos/1
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

> The interface becomes your **contract with the API** — if the API changes shape, TypeScript will warn you immediately.

### Step 2 — Make the API call using the interface as the type

---

## 4. API Call with Axios

Axios ships with its own TypeScript types — no `@types/` install needed.

```ts
import axios, { AxiosResponse } from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchData = async () => {
  try {
    const response: AxiosResponse<Todo> = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log("We got: ", response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};

fetchData();
```

**What is `AxiosResponse<T>`?**

`AxiosResponse` is a generic type provided by Axios. It represents the full HTTP response object and is defined as `AxiosResponse<T = any>` where `T` is the type of the `data` property.

The `AxiosResponse` object has many properties:

```
response.data       ← the actual response body (this is where T applies)
response.status     ← HTTP status code (200, 404, etc.)
response.headers    ← response headers
response.config     ← the request config
```

When you write `AxiosResponse<Todo>`, you are only specifying the type of `response.data`. All other properties stay as their default types. This gives you full autocompletion and type safety on the data you care about.

You can also let Axios infer it using the generic directly on `.get()`:

```ts
const response = await axios.get<Todo>(
  "https://jsonplaceholder.typicode.com/todos/1",
);
response.data; // typed as Todo ✅ — cleaner syntax, same result
```

---

## 5. API Call with Native `fetch`

The native `fetch` API doesn't support generics like Axios. You have to handle typing manually.

```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchResponse = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );

    // fetch does NOT throw on HTTP errors (404, 500, etc.)
    // You must check response.ok manually
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // response.json() returns Promise<any> — you cast it to your type
    const data: Todo = await response.json();

    console.log(data);
  } catch (error: any) {
    console.log(error.message);
  }
};

fetchResponse();
```

> With `fetch`, you are responsible for everything manually — error checking, type casting, parsing. Axios handles most of this for you automatically.

---

## 6. Axios vs Fetch — Quick Comparison

| Feature                          | Axios                  | Fetch                                |
| -------------------------------- | ---------------------- | ------------------------------------ |
| Throws on HTTP errors (4xx, 5xx) | ✅ Automatic           | ❌ Must check `response.ok` manually |
| Generic type support             | ✅ `axios.get<Todo>()` | ❌ Must cast manually                |
| JSON parsing                     | ✅ Automatic           | ❌ Must call `.json()` manually      |
| Request/Response interceptors    | ✅ Built-in            | ❌ Not available                     |
| Bundle size                      | Adds ~13KB             | Zero — built into browser            |
| TypeScript types                 | ✅ Ships built-in      | ✅ Built into TypeScript's lib       |

> **Rule of thumb**: For simple projects or Next.js server components, `fetch` is fine. For anything complex (interceptors, auth headers, retries), use Axios.

---

## Key Takeaways

1. Install `@types/library` as a dev dependency when a library doesn't ship its own types.
2. If no `@types/` exists, create a `.d.ts` file manually with the type declarations.
3. Always **model the API response as an interface first**, then use it in your call.
4. With Axios — use `AxiosResponse<YourType>` or `axios.get<YourType>()` for typed data.
5. With `fetch` — `response.json()` returns `any`, so cast it: `const data: YourType = await response.json()`.
6. `fetch` does NOT throw on 4xx/5xx — always check `response.ok` manually.
