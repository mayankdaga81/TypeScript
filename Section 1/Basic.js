function greet(name){
    return "hello, ", name;
}

console.log(greet(1));

// JS ISSUES:
// 1. DOCUMENTATION WITHOUT TYPES
//    - JS doesn't tell you what type variables should be (string, number, etc)
//    - You have to write comments to explain what types are expected
//    - People often forget to update docs when code changes
//    - No automatic checking that docs match the actual code
// 2. IDE DOESN'T HELP MUCH
//    - Your code editor can't give you good suggestions without type hints
//    - Mistakes only show up when you run the code, not while writing
//    - You have to test everything manually to find bugs
//    - No warnings before you accidentally pass wrong type to a function
// 3. WHAT TYPESCRIPT ADDS TO JAVASCRIPT:
//    - Types: You specify what type each variable should be (string, number, boolean)
//    - Early error catching: Mistakes show up BEFORE you run the code
//    - Better IDE support: Editor suggests correct methods and properties
//    - Consistent code: Types force everyone to use the same way
//    - Catches bugs while coding: Not waiting until production to find issues
// EXAMPLE FROM ABOVE CODE:
//    - Function greet() should take a string but got passed number (1)
//    - TypeScript would immediately warn: "Error: Argument of type 'number' 
//      is not assignable to parameter of type 'string'"
//    - JavaScript just runs it and creates a bug that users find later

