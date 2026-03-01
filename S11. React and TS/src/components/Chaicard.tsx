interface ChaiCardProp {
  name: string;
  price: number;
  isSpecial?: boolean;
}

// We have used TS in props here. ChaiCard was expecting props, and we have defined an interface which gives us more details about the props expectation.
// Next, we added the prop in the function, and now this will make sure that the prop is as per the interface defined.

// We have created a different interface rather than using the Chai iterface because, we would need the id here, however for  chaiList id is important as we need the keys.
export function ChaiCard({ name, price, isSpecial = false }: ChaiCardProp) {
  return (
    <article>
      <h2>
        {name} {isSpecial && <span>**</span>}
      </h2>
      <p>{price}</p>
    </article>
  );
}
