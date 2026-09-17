export function SimplePage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-3 text-z-stone">{eyebrow}</p>
      <h1 className="editorial mb-10 text-4xl md:text-5xl">{title}</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-z-ivory-dim">{children}</div>
    </div>
  );
}
