"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

// Shared honest-placeholder garment mesh: a proportioned silhouette
// built from primitives, used by both the single-product GarmentViewer
// and the Showroom. Swap for a real useGLTF(model3D) load once actual
// .glb assets exist — see GarmentViewer.tsx.
export function PlaceholderGarmentMesh({
  category,
  spin = true,
  color = "#c9c2b3",
}: {
  category?: string;
  spin?: boolean;
  color?: string;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * 0.15;
  });

  const isOuterwear = category === "outerwear" || category === "knitwear";

  return (
    <group ref={ref}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <capsuleGeometry args={[0.5, isOuterwear ? 1.05 : 0.85, 6, 16]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.65, 0.5, 0]} rotation={[0, 0, side * 0.35]} castShadow>
          <capsuleGeometry args={[0.14, 0.68, 6, 12]} />
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
