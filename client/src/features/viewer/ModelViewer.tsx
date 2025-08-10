import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Gltf } from '@react-three/drei';

// This component can load any GLTF file
function ModelViewer({ url }) {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 100 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Gltf src={url} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

// Example usage
export const DynamicModel = () => {
  const gltfModelUrl = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb';
  
  return (
    <div style={{ width: '100%', height: '500px', padding: '48px' }}>
      <ModelViewer url={gltfModelUrl} />
    </div>
  );
};