import { Suspense, memo, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, ContactShadows, Stars, Preload } from '@react-three/drei';
import { Phone } from './components/Phone';
import { Overlay } from './components/Overlay';
import { Intro } from './components/Intro';

const Scene = memo(() => {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      <Suspense fallback={null}>
        <Environment preset="city" />
        
        <ScrollControls pages={10} damping={0.4} distance={1} infinite={false}>
          <Phone />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Scroll html style={{ width: '100vw' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
        <Preload all />
      </Suspense>
    </>
  );
});

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      
      {/* 
        The main scene is always present but hidden behind the intro or 
        rendered only after intro if you want to save resources. 
        For seamless transition, we keep it ready.
      */}
      <div style={{ 
        opacity: showIntro ? 0 : 1, 
        transition: 'opacity 2s ease-in-out',
        width: '100%',
        height: '100%'
      }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="loader" style={{ pointerEvents: 'none', position: 'fixed', zIndex: -1, color: 'white' }}>
        NOVA X
      </div>
    </div>
  );
}

export default App;
