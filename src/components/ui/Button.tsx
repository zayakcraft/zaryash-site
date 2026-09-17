import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const base =
  "eyebrow inline-flex items-center justify-center gap-2 px-6 py-3 transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-z-ivory text-z-black hover:bg-z-stone",
  outline: "border border-z-line-strong text-z-ivory hover:border-z-ivory",
  ghost: "text-z-ivory hover:opacity-70",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: CommonProps & { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
