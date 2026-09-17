"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "zaryash-intro-seen";

export function CinematicIntro() {
  const [phase, setPhase] = useState<"hidden" | "entering" | "holding" | "exiting" | "done">(
    "hidden"
  );

  useEffect(() => {
    // sessionStorage / matchMedia are browser-only, so this decision can only
    // be made client-side after mount — computing it during render would
    // either desync from SSR or require unsafe window access at module load.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);

    if (seen || reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("entering");
    const t1 = setTimeout(() => setPhase("holding"), 250);
    const t2 = setTimeout(() => setPhase("exiting"), 2200);
    const t3 = setTimeout(() => setPhase("done"), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done" || phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-z-black transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="presentation"
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-[1800ms] ${
          phase === "holding" || phase === "exiting" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(184,173,154,0.10), transparent 60%)",
        }}
      />
      <p
        className={`editorial text-3xl tracking-[0.3em] text-z-ivory transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:text-5xl ${
          phase === "entering" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        ZARYASH
      </p>
      <button
        onClick={() => setPhase("done")}
        className="eyebrow absolute bottom-10 right-10 text-z-warm-gray transition-colors hover:text-z-ivory"
      >
        SKIP
      </button>
    </div>
  );
}
