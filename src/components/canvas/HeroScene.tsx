"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame((state, delta) => {
    // Exact Rotation Constraints as requested:
    // Max X rotation: 3 degrees (0.0523 rad) -> mapped to pointer.y
    // Max Y rotation: 5 degrees (0.0872 rad) -> mapped to pointer.x
    const targetRotX = pointer.y * 0.0523; 
    const targetRotY = -pointer.x * 0.0872;
    
    // Framerate independent damping for spring-like physical feel (velocity aware, no delayed easing)
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetRotX, 6, delta);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetRotY, 6, delta);
  });
  
  return null;
}

function ParallaxLayer({ multiplier, children }: { multiplier: number, children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Physical spring connection to mouse using exact multipliers
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, pointer.x * multiplier * 20, 8, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, pointer.y * multiplier * 20, 8, delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function InteractiveLight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { pointer } = useThree();
  
  useFrame((state, delta) => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.damp(lightRef.current.position.x, pointer.x * 10, 5, delta);
      lightRef.current.position.y = THREE.MathUtils.damp(lightRef.current.position.y, pointer.y * 10, 5, delta);
    }
  });
  
  return <spotLight ref={lightRef} position={[0, 0, 10]} angle={0.25} penumbra={1} intensity={2} />;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <CameraRig />
        
        <fog attach="fog" args={["#050505", 5, 20]} />
        <color attach="background" args={["#050505"]} />
        
        <ambientLight intensity={0.5} />
        <InteractiveLight />
        
        <Suspense fallback={null}>
          {/* Background Layer: 0.01 Multiplier */}
          <ParallaxLayer multiplier={0.01}>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
              <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </Float>
          </ParallaxLayer>
          
          {/* Mid Layer: 0.03 Multiplier */}
          <ParallaxLayer multiplier={0.03}>
            <Sparkles count={200} scale={20} size={4} speed={0.2} opacity={0.1} color="#888888" />
            <Sparkles count={100} scale={10} size={6} speed={0.1} opacity={0.05} color="#aaaaaa" />
          </ParallaxLayer>
          
          {/* Foreground Layer: 0.06 Multiplier */}
          <ParallaxLayer multiplier={0.06}>
            <Sparkles count={400} scale={15} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
          </ParallaxLayer>
        </Suspense>
      </Canvas>
    </div>
  );
}
