// In this file, we will look into children props in react with TS.
import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  footer?: ReactNode;
}

// Since the CardProps is extended interface from PropsWithChildren, so children will be here anyways.
export function Card({ title, children, footer }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}
