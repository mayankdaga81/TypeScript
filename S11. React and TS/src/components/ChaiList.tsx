//Notice how we have imported the Chai interface form the tpes file here.
// We have imported "type", and it means that we are saything this to TS that we do not care about functionality, we just want the types from this file.
import type { Chai } from "../types";
import { ChaiCard } from "./Chaicard";

// we will be using an existing interface to create a new interface here.
interface ChaiListProps {
  items: Chai[];
}

//Inpt type of the prop is defined.
export function ChaiList({ items }: ChaiListProps) {
  return (
    <div>
      {items.map((chai) => (
        <ChaiCard
          key={chai.id}
          name={chai.name}
          price={chai.price}
          isSpecial={chai.price > 30}
        />
      ))}
    </div>
  );
}
