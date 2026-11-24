import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  newTab?: boolean;
};

export default function Link({
  href,
  children,
  newTab = false,
  className = "",
  rel,
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      className={`text-foreground underline decoration-secondary decoration-1 underline-offset-[0.2em] hover:decoration-2 focus-visible:rounded-sm focus-ring focus-visible:outline-offset-4 ${className}`.trim()}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? rel ?? "noreferrer" : rel}
      {...props}
    >
      {children}
    </a>
  );
}
