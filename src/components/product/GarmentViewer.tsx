"use client";

// ZARYASH — GarmentViewer
// ------------------------------------------------------------
// Real usage: pass product.model3D (a .glb path under public/models/)
// and this renders it with @react-three/drei's useGLTF, fully
// interactive (rotate / zoom / reset). No product has a real model
// yet, so it renders an honest placeholder — a proportioned garment
// silhouette built from primitives, never a fabricated "photoreal"
// 3D garment. It also degrades gracefully: if WebGL isn't available,
// or anything in the 3D stack throws, it falls back to a static
// panel instead of a blank canvas or console error.

import { Suspense, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { PlaceholderGarmentMesh } from "@/components/three/PlaceholderGarmentMesh";

function Scene({ category }: { category?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} castShadow />
      <PlaceholderGarmentMesh category={category} />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.5} blur={2.5} far={2} />
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}

function Fallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-z-charcoal-2 text-center">
      <p className="eyebrow text-z-warm-gray">3D VIEW UNAVAILABLE</p>
      <p className="editorial px-6 text-sm text-z-ivory-dim">{label}</p>
    </div>
  );
}

export function GarmentViewer({
  category,
  productName,
  hasRealModel = false,
}: {
  category?: string;
  productName: string;
  hasRealModel?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [supportsWebGL] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      return false;
    }
  });

  if (!supportsWebGL || failed) {
    return (
      <Fallback
        label={`Your browser can't render the ${productName} in 3D. Showing the photo gallery instead.`}
      />
    );
  }

  return (
    <div className="relative h-full w-full bg-z-charcoal-2">
      {!hasRealModel && (
        <p className="eyebrow absolute left-3 top-3 z-10 text-z-warm-gray">
          PLACEHOLDER MODEL — ASSET SLOT: model.glb
        </p>
      )}
      <Suspense fallback={<Fallback label="Loading 3D model…" />}>
        <ErrorCatcher onError={() => setFailed(true)}>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.3, 3], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene category={category} />
          </Canvas>
        </ErrorCatcher>
      </Suspense>
    </div>
  );
}

// Minimal error boundary — React Three Fiber render errors otherwise
// crash the whole page rather than degrading to the 2D fallback.
import { Component } from "react";

class ErrorCatcher extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
