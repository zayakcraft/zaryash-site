"use client";

// Dynamically imported, client-only wrapper around GarmentViewer.
// Three.js / R3F touch browser globals at module load time, so this
// must never be evaluated during SSR — dynamic() with ssr:false keeps
// the 3D stack out of the server bundle and out of the initial
// JS payload until the viewer is actually opened (see PERFORMANCE
// in README: don't load a 3D scene before the user needs it).

import dynamic from "next/dynamic";

const GarmentViewer = dynamic(
  () => import("@/components/product/GarmentViewer").then((m) => m.GarmentViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-z-charcoal-2">
        <p className="eyebrow text-z-warm-gray">LOADING 3D VIEWER…</p>
      </div>
    ),
  }
);

export { GarmentViewer as GarmentViewerLazy };
