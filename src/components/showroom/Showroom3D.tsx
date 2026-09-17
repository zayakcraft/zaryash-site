"use client";

import { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { getFeaturedProducts } from "@/lib/products";
import { PlaceholderGarmentMesh } from "@/components/three/PlaceholderGarmentMesh";
import type { Product } from "@/lib/types";

const SPACING = 2.6;

function Pedestal({
  product,
  index,
  selected,
  onSelect,
}: {
  product: Product;
  index: number;
  selected: boolean;
  onSelect: (p: Product) => void;
}) {
  const x = (index - (getFeaturedProducts().length - 1) / 2) * SPACING;
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.3, 32]} />
        <meshStandardMaterial color={selected ? "#f4f1ea" : "#201f1c"} roughness={0.6} />
      </mesh>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <PlaceholderGarmentMesh category={product.category} color={selected ? "#f4f1ea" : "#b8ad9a"} />
      </group>
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.11}
        color={selected ? "#f4f1ea" : "#8a8478"}
        anchorX="center"
        anchorY="middle"
      >
        {product.name.toUpperCase()}
      </Text>
    </group>
  );
}

function CameraRig({ target }: { target: [number, number, number] | null }) {
  const { camera } = useThree();
  useFrame(() => {
    const goal = target ? new THREE.Vector3(target[0], 0.3, 2.2) : new THREE.Vector3(0, 1.4, 6.5);
    camera.position.lerp(goal, 0.06);
    camera.lookAt(target ? target[0] : 0, 0.2, 0);
  });
  return null;
}

function Room() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#161512" roughness={0.95} />
      </mesh>
      <mesh position={[0, 3, -6]} receiveShadow>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#0a0a08" roughness={1} />
      </mesh>
    </>
  );
}

function Scene({
  selected,
  onSelect,
}: {
  selected: Product | null;
  onSelect: (p: Product) => void;
}) {
  const featured = getFeaturedProducts();
  const selectedX = selected
    ? (featured.findIndex((p) => p.id === selected.id) - (featured.length - 1) / 2) * SPACING
    : null;

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[0, 6, 3]} angle={0.5} penumbra={0.6} intensity={1.4} castShadow />
      <directionalLight position={[-4, 4, 2]} intensity={0.4} />
      <Room />
      {featured.map((p, i) => (
        <Pedestal
          key={p.id}
          product={p}
          index={i}
          selected={selected?.id === p.id}
          onSelect={onSelect}
        />
      ))}
      <ContactShadows position={[0, -0.84, 0]} opacity={0.45} blur={2} far={4} />
      <Environment preset="warehouse" />
      <CameraRig target={selectedX !== null ? [selectedX, 0, 0] : null} />
      <OrbitControls
        enabled={!selected}
        enablePan={false}
        minDistance={4}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export function Showroom3D({ onSelect }: { onSelect: (p: Product | null) => void }) {
  const [selected, setSelected] = useState<Product | null>(null);

  function handleSelect(p: Product) {
    const next = selected?.id === p.id ? null : p;
    setSelected(next);
    onSelect(next);
  }

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 6.5], fov: 45 }}
      onPointerMissed={() => {
        setSelected(null);
        onSelect(null);
      }}
    >
      <Suspense fallback={null}>
        <Scene selected={selected} onSelect={handleSelect} />
      </Suspense>
    </Canvas>
  );
}
