# TypeScript — Object Oriented Programming (OOP)

TypeScript builds on JavaScript's class system and adds **type safety**, **access modifiers**, and other OOP features that make code more structured and predictable.

---

## 1. Classes — The Blueprint

A **class** is a blueprint for creating objects. It defines what properties (data) and methods (behavior) an object will have.

```ts
class Chai {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  describe() {
    console.log(`${this.name} costs ₹${this.price}`);
  }
}

const masala = new Chai("Masala Chai", 20);
masala.describe(); // "Masala Chai costs ₹20"
```

> Think of a class as a mold, and objects as the things made from it.

---

## 2. Access Modifiers

Access modifiers control **who can read or change** a class property or method.

TypeScript has three: `public`, `private`, and `protected`.

> **Is it mandatory?** No — but it is **strongly recommended**. Without them, everything defaults to `public`, which means any code anywhere can accidentally modify internal data.

---

### `public` — Open to everyone (default)

```ts
class Chai {
  public name: string = "Masala";
}

const c = new Chai();
console.log(c.name); // ✅ accessible from anywhere
```

---

### `private` — Only inside the class

Nothing outside the class — not even child classes — can touch it.

```ts
class Chai {
  private _price: number = 20; // _ prefix is standard practice for private props

  getPrice() {
    return this._price; // ✅ accessible inside the class
  }
}

const c = new Chai();
console.log(c._price);    // ❌ Error — private
console.log(c.getPrice()); // ✅ via method
```

> **Standard practice**: prefix private properties with an underscore `_price`, `_name`, etc. This signals to other developers that the property is internal/private.

---

### `protected` — Inside class + child classes

Like `private`, but child classes that extend it can also access it.

```ts
class Drink {
  protected temperature: number = 90;
}

class Chai extends Drink {
  describe() {
    console.log(`Served at ${this.temperature}°C`); // ✅ child can access
  }
}

const c = new Chai();
console.log(c.temperature); // ❌ Error — not accessible outside
```

---

### `#` — JavaScript Native Private (Hard Private)

TypeScript's `private` is a compile-time check only — it's stripped at runtime. JavaScript's native `#` syntax enforces privacy **at runtime** too.

```ts
class Chai {
  #secret = "special formula";

  reveal() {
    return this.#secret; // ✅ only inside class
  }
}

const c = new Chai();
console.log(c.#secret); // ❌ Error — truly private even at runtime
```

| Feature | `private` (TS) | `#` (JS native) |
|---|---|---|
| Compile-time check | ✅ | ✅ |
| Runtime enforcement | ❌ | ✅ |
| Works in plain JS | ❌ | ✅ |

> Use `#` when you need rock-solid privacy. Use `private` for most TypeScript codebases where compile-time protection is enough.

---

## 3. Getters and Setters

Since `private` properties can't be accessed directly from outside, you use **getters** and **setters** to safely read or update them.

- **Getter** → reads the value (like a function, called like a property)
- **Setter** → updates the value with optional validation

```ts
class Chai {
  private _price: number = 20;

  // Getter — read the private value
  get price(): number {
    return this._price;
  }

  // Setter — update with validation
  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
}

const c = new Chai();
console.log(c.price);  // ✅ calls getter — "20"
c.price = 30;          // ✅ calls setter
c.price = -5;          // ❌ throws Error
```

> They look like properties from the outside but behave like functions — clean API with internal control.

---

## 4. `readonly` Properties

A `readonly` property can only be set **once** (at declaration or in the constructor). After that, it cannot be changed.

```ts
class Chai {
  readonly origin: string;

  constructor(origin: string) {
    this.origin = origin; // ✅ set once in constructor
  }
}

const c = new Chai("Assam");
console.log(c.origin); // "Assam"
c.origin = "Darjeeling"; // ❌ Error — readonly
```

> Use `readonly` for values that identify an object and should never change after creation, like IDs, origins, or config.

---

## 5. Constructor Parameter Shorthand

TypeScript lets you declare and initialize properties directly in the constructor — less boilerplate:

```ts
// ❌ Verbose way
class Chai {
  name: string;
  private _price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this._price = price;
  }
}

// ✅ Shorthand — TypeScript only
class Chai {
  constructor(
    public name: string,
    private _price: number
  ) {}
}
```

Both are equivalent. The shorthand declares + assigns the property in one step.

---

## 6. Static Properties and Methods

`static` properties/methods belong to the **class itself**, not to any instance. All instances share the same static value.

```ts
class ChaiShop {
  static totalOrders: number = 0;

  placeOrder() {
    ChaiShop.totalOrders++; // access via class name, not `this`
  }
}

const shop1 = new ChaiShop();
const shop2 = new ChaiShop();

shop1.placeOrder();
shop2.placeOrder();

console.log(ChaiShop.totalOrders); // 2 — shared across all instances
```

> Use `static` for counters, utility methods, or factory methods that don't depend on instance data.

---

## 7. Inheritance (`extends`)

A child class can **inherit** properties and methods from a parent class and add or override them.

```ts
class Drink {
  constructor(public name: string) {}

  serve() {
    console.log(`Serving ${this.name}`);
  }
}

class Chai extends Drink {
  constructor(name: string, public type: string) {
    super(name); // must call parent constructor
  }

  serve() {
    console.log(`Serving ${this.type} ${this.name}`); // override
  }
}

const c = new Chai("Chai", "Masala");
c.serve(); // "Serving Masala Chai"
```

---

## 8. Abstract Classes

An **abstract class** is a class that **cannot be instantiated directly** — it exists only to be extended. It can define abstract methods that child classes **must** implement.

```ts
abstract class Drink {
  abstract make(): void; // no body — child must implement

  serve() {
    console.log("Serving the drink"); // non-abstract — shared behavior
  }
}

class MyChai extends Drink {
  make(): void {
    console.log("Boiling water and adding tea leaves");
  }
}

// const d = new Drink(); // ❌ Error — cannot instantiate abstract class
const c = new MyChai();
c.make();  // ✅
c.serve(); // ✅ inherited from Drink
```

> Think of an abstract class as a **contract + partial implementation**. It says: "Every drink must implement `make()`, but they all share `serve()`."

**When to use abstract vs interface?**
- Use **abstract class** when you want to share some implementation (methods with actual code) + enforce a contract.
- Use **interface** when you only want to enforce a contract with no shared implementation.

---

## 9. Composition

**Composition** means building a class by **combining other classes** rather than inheriting from them. The idea: prefer "has-a" over "is-a".

```ts
class Heater {
  heat() {
    console.log("Heating...");
  }
}

class ChaiMaker {
  constructor(private heater: Heater) {} // ChaiMaker "has a" Heater

  make() {
    this.heater.heat(); // delegate to the composed class
    console.log("Chai is ready!");
  }
}

const heater = new Heater();
const maker = new ChaiMaker(heater);
maker.make();
// "Heating..."
// "Chai is ready!"
```

> `ChaiMaker` doesn't extend `Heater` — it **uses** a `Heater`. This makes classes loosely coupled and easier to swap, test, and reuse.

**Composition vs Inheritance:**

| | Inheritance (`extends`) | Composition (has-a) |
|---|---|---|
| Relationship | "is-a" (Chai is-a Drink) | "has-a" (ChaiMaker has-a Heater) |
| Coupling | Tightly coupled | Loosely coupled |
| Flexibility | Less flexible | More flexible — swap parts easily |
| General advice | Use sparingly | **Prefer this** in most cases |

---

## 10. Implementing Interfaces in Classes (`implements`)

A class can **implement** an interface, promising to provide all the properties and methods defined in it.

```ts
interface Brewable {
  brew(): void;
  temperature: number;
}

class Chai implements Brewable {
  temperature = 90;

  brew() {
    console.log("Brewing chai at 90°C");
  }
}
```

> `implements` is a compile-time check — TypeScript verifies the class fulfills the interface's contract.

---

## Summary — Quick Reference

| Concept | What it means |
|---|---|
| `public` | Accessible everywhere (default) |
| `private` | Only inside the class |
| `protected` | Inside class + child classes |
| `#` | Native JS private — enforced at runtime too |
| `readonly` | Set once, never changed |
| `_name` convention | Prefix for private properties |
| `static` | Belongs to the class, not instances |
| Getter/Setter | Controlled access to private properties |
| `abstract` | Blueprint class — cannot instantiate, must extend |
| Composition | Build with "has-a" — inject dependencies |
| `implements` | Class must fulfill an interface contract |
| Constructor shorthand | Declare + assign in one step with access modifier |
