import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Optimization: Define materials outside the component to prevent recreation on re-render
const titaniumMaterial = new THREE.MeshStandardMaterial({
  color: '#333336',
  metalness: 0.9,
  roughness: 0.2,
});

const screenMaterial = new THREE.MeshStandardMaterial({
  color: '#000000',
  metalness: 0.5,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});

const lensMaterial = new THREE.MeshPhysicalMaterial({
  color: '#050505',
  metalness: 0.9,
  roughness: 0.1,
  transmission: 0.9,
  thickness: 0.5,
});

const flashMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });

export const Phone = () => {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const tl = useRef<gsap.core.Timeline>();

  // Optimization: Pre-calculate geometry parameters if needed, 
  // though RoundedBox is relatively efficient, stable refs help.

  useLayoutEffect(() => {
    if (!group.current) return;

    // Create a timeline that spans from 0 to 1 based on scroll progress
    // We use a linear ease for the timeline itself as scroll.offset provides the damping
    tl.current = gsap.timeline({ 
      paused: true,
      defaults: { ease: "power2.inOut", duration: 1 } 
    });

    const phone = group.current;

    // We use relative timestamps (+=) or absolute positions in the timeline
    // Hero Section (0-10%)
    tl.current.to(phone.position, { y: 0, x: 0, z: 0 }, 0);
    tl.current.to(phone.rotation, { x: 0.2, y: -0.4, z: 0.1 }, 0);

    // Product Reveal (10-20%)
    tl.current.to(phone.rotation, { x: 0, y: Math.PI, z: 0 }, 1);
    tl.current.to(phone.position, { x: 1.5, y: 0, z: -1 }, 1);

    // Design Story (20-30%)
    tl.current.to(phone.rotation, { x: 0, y: Math.PI / 2, z: 0 }, 2);
    tl.current.to(phone.position, { x: 0, y: 0, z: 1 }, 2);

    // Camera Experience (30-40%)
    tl.current.to(phone.rotation, { x: -0.2, y: Math.PI - 0.2, z: 0 }, 3);
    tl.current.to(phone.position, { x: -1, y: -0.5, z: 3 }, 3);

    // Performance (40-50%)
    tl.current.to(phone.rotation, { x: 0.5, y: -0.5, z: -0.2 }, 4);
    tl.current.to(phone.position, { x: 1, y: 0, z: 0 }, 4);

    // AI Experience (50-70%)
    tl.current.to(phone.rotation, { x: 0, y: 0, z: 0 }, 6);
    tl.current.to(phone.position, { x: 0, y: 0, z: 2 }, 6);

    // Showcase & CTA (70-100%)
    tl.current.to(phone.rotation, { x: 0.1, y: Math.PI * 2, z: 0 }, 9);
    tl.current.to(phone.position, { x: 0, y: 0, z: 0 }, 9);

    return () => {
      tl.current?.kill();
    };
  }, []);

  // Performance: Keep useFrame extremely lean.
  // Instead of seek(), we'll use a smoother interpolation if needed, 
  // but ScrollControls damping is usually enough. 
  // The key is ensuring the timeline isn't being recreated.
  const lastTime = useRef(0);

  useFrame((state) => {
    if (tl.current && scroll) {
      // Seek progress smoothly. scroll.offset is already damped by ScrollControls.
      // To ensure ultra-smooth upward/downward movement, we can lerp the targetTime
      // though scroll.offset usually suffices. The main improvement is ensuring
      // the timeline is linear and we seek precisely.
      
      const targetTime = scroll.offset * tl.current.duration();
      
      // Simple lerp for an extra layer of cinematic smoothness
      lastTime.current = THREE.MathUtils.lerp(lastTime.current, targetTime, 0.1);
      tl.current.seek(lastTime.current);
      
      // Independent cinematic float
      if (group.current) {
        group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.0005;
      }
    }
  });

  return (
    <group ref={group}>
      {/* Phone Body */}
      <RoundedBox args={[2.2, 4.5, 0.3]} radius={0.15} smoothness={4} material={titaniumMaterial}>
        {/* Screen */}
        <mesh position={[0, 0, 0.151]} material={screenMaterial}>
          <planeGeometry args={[2.1, 4.4]} />
        </mesh>

        {/* Camera Bump */}
        <RoundedBox args={[1.0, 1.0, 0.1]} radius={0.1} position={[-0.45, 1.5, -0.15]} material={titaniumMaterial}>
          {/* Lenses */}
          <mesh position={[-0.2, 0.2, -0.05]} material={lensMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          </mesh>
          <mesh position={[0.2, 0.2, -0.05]} material={lensMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          </mesh>
          <mesh position={[-0.2, -0.2, -0.05]} material={lensMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          </mesh>
          {/* Flash */}
          <mesh position={[0.2, -0.2, -0.05]} material={flashMaterial}>
            <circleGeometry args={[0.08, 16]} />
          </mesh>
        </RoundedBox>

        {/* Side Buttons */}
        <mesh position={[1.11, 0.8, 0]} material={titaniumMaterial}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
        </mesh>
        <mesh position={[-1.11, 0.8, 0]} material={titaniumMaterial}>
          <boxGeometry args={[0.05, 0.2, 0.05]} />
        </mesh>
        <mesh position={[-1.11, 0.4, 0]} material={titaniumMaterial}>
          <boxGeometry args={[0.05, 0.2, 0.05]} />
        </mesh>
      </RoundedBox>
    </group>
  );
};
