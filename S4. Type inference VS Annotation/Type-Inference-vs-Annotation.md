# Type Inference vs Type Annotation


## Type Inference


TypeScript automatically determines the type based on the assigned value.


```typescript
let name = "John"; // TypeScript infers: string
let age = 25; // TypeScript infers: number
let isActive = true; // TypeScript infers: boolean
```


## Type Annotation


Explicitly specify the type using a colon (`:`) followed by the type.


```typescript
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
```


## When to Use Each


**Use Type Inference:**


- When the type is obvious from the assigned value
- Keeps code cleaner and more concise


**Use Type Annotation:**


- Function parameters (required)
- When declaring variables without immediate initialization
- When you want to enforce a specific type
- For better code documentation


```typescript
// Inference is sufficient
let count = 0;


// Annotation is necessary
function greet(name: string): string {
  return `Hello, ${name}`;
}


// Annotation needed for later initialization
let userId: number;
userId = 123;
```




