// HOW TYPES ARE ADDED IN TYPESCRIPT:
// The syntax "name: string" tells TypeScript that 'name' must be a string
// This is called a "type annotation"

function greet1(name: string){
    return `Hello ${name}`;
}

console.log(greet1("Mayank"));

// WHY THIS IS BETTER THAN THE PREVIOUS JS VERSION:
//
// BEFORE (JavaScript):
//   function greet(name){
//       return "hello, ", name;
//   }
//   console.log(greet(1));  // ❌ Accepts number, creates wrong output
//
// NOW (TypeScript):
//   function greet1(name: string){
//       return `Hello ${name}`;
//   }
//   console.log(greet1("Mayank"));  // ✓ Only accepts strings
//
// IMPROVEMENTS:
// 1. TYPE SAFETY
//    - If you try greet1(1), TypeScript shows error BEFORE running code
//    - You can only pass a string, not a number or other type
//
// 2. BETTER CODE
//    - Uses template literals (backticks) instead of wrong concatenation
//    - Cleaner syntax and correct string output
//
// 3. IDE HELP
//    - Code editor knows 'name' is a string, suggests string methods
//    - Auto-complete works better with type information
//
// 4. CLEAR DOCUMENTATION
//    - Anyone reading the code sees exactly what type is expected
//    - No guessing or reading comments