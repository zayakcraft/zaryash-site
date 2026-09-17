"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { Button } from "@/components/ui/Button";

const OCCASIONS = ["Dinner", "Work", "Travel", "Off-Duty"];
const MOODS = ["Quiet Confidence", "Bold", "Relaxed", "Sharp"];
const COLORS = ["Obsidian Black", "Ivory", "Stone", "Charcoal"];

export function BuildYourPresence() {
  const router = useRouter();
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [color, setColor] = useState(COLORS[0]);

  return (
    <section className="bg-z-charcoal px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <FadeInSection>
          <p className="eyebrow mb-5 text-z-stone">04 — BUILD YOUR PRESENCE</p>
          <h2 className="editorial text-4xl leading-tight md:text-6xl">
            Tell us the room. We&rsquo;ll find the fit.
          </h2>
        </FadeInSection>

        <FadeInSection delay={150} className="mt-14 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          <Field label="OCCASION" value={occasion} options={OCCASIONS} onChange={setOccasion} />
          <Field label="MOOD" value={mood} options={MOODS} onChange={setMood} />
          <Field label="COLOR" value={color} options={COLORS} onChange={setColor} />
        </FadeInSection>

        <FadeInSection delay={250} className="mt-12">
          <Button
            onClick={() =>
              router.push(
                `/ai?occasion=${encodeURIComponent(occasion)}&mood=${encodeURIComponent(
                  mood
                )}&color=${encodeURIComponent(color)}`
              )
            }
          >
            FIND MY PRESENCE
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="eyebrow text-z-warm-gray">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-z-line-strong bg-transparent py-2 text-sm text-z-ivory outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-z-charcoal">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
