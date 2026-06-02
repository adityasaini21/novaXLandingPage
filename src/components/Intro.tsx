import React, { useRef, useState, memo, Suspense, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * PREMIUM MATERIALS
 * Studio-grade materials for a luxury hardware feel.
 * Defined outside to prevent recreation and ensure 60 FPS.
 */
const titaniumMaterial = new THREE.MeshStandardMaterial({
  color: '#2a2a2a',
  metalness: 1,
  roughness: 0.15,
  envMapIntensity: 1.5,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#000000',
  metalness: 0.9,
  roughness: 0.05,
  transmission: 0, // Solid dark glass
  thickness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
});

const emissionMaterial = new THREE.MeshStandardMaterial({
  color: '#0071e3',
  emissive: '#0071e3',
  emissiveIntensity: 0,
});

const IntroScene = memo(({ onComplete }: { onComplete: () => void }) => {
  const phoneRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!phoneRef.current || !spotlightRef.current || !rimLightRef.current) return;

    const phone = phoneRef.current;
    const spotlight = spotlightRef.current;
    const rimLight = rimLightRef.current;

    // Reset initial state
    phone.position.set(0, -6, -1);
    phone.rotation.set(0.4, 0, 0);
    spotlight.intensity = 0;
    rimLight.intensity = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".intro-overlay", {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete
        });
      }
    });

    /**
     * CINEMATIC REVEAL SEQUENCE
     */

    // Scene 1: Pure Darkness -> Silhouette (0s - 1s)
    tl.to(rimLight, { intensity: 5, duration: 1.5, ease: "power2.inOut" }, 0.5);

    // Scene 2 & 3: Phone emerges with Light Beam (1s - 3s)
    tl.to(phone.position, { y: 0, duration: 4, ease: "expo.out" }, 1);
    tl.to(spotlight, { intensity: 200, duration: 2.5, ease: "power2.inOut" }, 1.5);

    // Scene 4 & 5: Cinematic Orbit + Reflection Sweep (3s - 5s)
    tl.to(phone.rotation, { 
      y: Math.PI * 0.25, 
      x: -0.1, 
      duration: 5, 
      ease: "power1.inOut" 
    }, 2);

    tl.to(camera.position, { 
      z: 5, 
      y: 0.8, 
      duration: 5, 
      ease: "power1.inOut" 
    }, 2);

    // Scene 6: Typography Reveal
    tl.to(".intro-text-1", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 2.5);
    tl.to(".intro-text-1", { opacity: 0, y: -40, duration: 1, ease: "power3.in" }, 4.5);
    tl.to(".intro-text-2", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 5);

    // Scene 7: Creator Credit (Premium Signature)
    tl.to(".creator-credit", { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 7);
    tl.to(".creator-credit", { opacity: 0, duration: 1, ease: "power2.in" }, 9);

    // Scene 8: Climax Energy Pulse
    tl.to(emissionMaterial, {
      emissiveIntensity: 40,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    }, 6);

    tl.to(camera.position, { 
      z: 3.5, 
      duration: 2.5, 
      ease: "expo.inOut" 
    }, 6);

    return () => { tl.kill(); };
  }, [camera, onComplete]);

  useFrame((state) => {
    // Sub-millimeter floating for premium feel
    if (phoneRef.current) {
      phoneRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.0005;
    }
    // Spotlight always tracks the product
    if (spotlightRef.current && phoneRef.current) {
      spotlightRef.current.target = phoneRef.current;
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      
      {/* Lights */}
      <ambientLight intensity={0.02} />
      <pointLight ref={rimLightRef} position={[-2, 2, -2]} color="#0071e3" intensity={0} />
      <spotLight
        ref={spotlightRef}
        position={[8, 12, 8]}
        angle={0.2}
        penumbra={1}
        castShadow
        intensity={0}
      />
      
      {/* 3D Model */}
      <group ref={phoneRef}>
        {/* Chassis */}
        <mesh material={titaniumMaterial} castShadow receiveShadow>
          <boxGeometry args={[2.2, 4.5, 0.28]} />
        </mesh>
        
        {/* Front Glass */}
        <mesh position={[0, 0, 0.141]} material={glassMaterial}>
          <planeGeometry args={[2.1, 4.4]} />
        </mesh>

        {/* Neural Core (Emissive) */}
        <mesh position={[0, 0, 0.142]} material={emissionMaterial}>
          <planeGeometry args={[2.0, 4.3]} />
        </mesh>
      </group>

      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={15} blur={2.5} far={4} />
      <Stars radius={100} depth={50} count={800} factor={2} saturation={0} fade speed={0.2} />
      <Environment preset="city" />
    </>
  );
});

export const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const [started, setStarted] = useState(false);

  return (
    <div className="intro-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000,
      background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      {!started ? (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '0.8rem', letterSpacing: '0.5em', opacity: 0.6 }}>THE FUTURE HAS ARRIVED</h2>
          <button onClick={() => setStarted(true)} className="btn-primary">
            DISCOVER NOVA X
          </button>
        </div>
      ) : (
        <>
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
            <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
              <Suspense fallback={null}>
                <IntroScene onComplete={onComplete} />
              </Suspense>
            </Canvas>
          </div>

          {/* Typography Overlays */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10
          }}>
            <h2 className="intro-text-1" style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', fontWeight: 800, opacity: 0, transform: 'translateY(60px)', color: 'white', letterSpacing: '-0.05em', margin: 0 }}>NOVA X</h2>
            <h2 className="intro-text-2" style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)', fontWeight: 300, opacity: 0, transform: 'translateY(60px)', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.6em', marginTop: '1.5rem', position: 'absolute' }}>BEYOND IMAGINATION</h2>
            
            {/* Creator Credit Signature */}
            <div className="creator-credit" style={{
              position: 'absolute',
              bottom: '15vh',
              opacity: 0,
              transform: 'translateY(20px)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <p style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>Designed & Developed by</p>
              <p style={{
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif'
              }}>ADITYA SAINI</p>
            </div>
          </div>

          <button onClick={onComplete} style={{ position: 'absolute', bottom: '50px', right: '50px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.4em', zIndex: 100, pointerEvents: 'auto', textTransform: 'uppercase' }}>Skip</button>
        </>
      )}
    </div>
  );
};
