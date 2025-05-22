
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { Skeleton } from '@/components/ui/skeleton';
import * as THREE from 'three';

interface ProductPreviewProps {
  productType: 'tshirt' | 'hoodie' | 'sleevie' | 'cap';
  customImage: string | null;
  customText: string;
}

// 3D Model component
const Model = ({ productType, customImage, customText }: ProductPreviewProps) => {
  const group = useRef<THREE.Group>(null);
  
  // Different colors for different product types
  const getProductColor = () => {
    switch (productType) {
      case 'tshirt': return 'white';
      case 'hoodie': return 'gray';
      case 'sleevie': return 'lightblue';
      case 'cap': return 'red';
      default: return 'white';
    }
  };
  
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={getProductColor()} />
      </mesh>
      
      {customImage && (
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial>
            <primitive attach="map" object={new THREE.TextureLoader().load(customImage)} />
          </meshBasicMaterial>
        </mesh>
      )}
      
      {customText && customText.length > 0 && (
        <mesh position={[0, -0.6, 0.51]}>
          <planeGeometry args={[0.8, 0.2]} />
          <meshStandardMaterial color="white" opacity={0.5} transparent />
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.05}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {customText}
          </Text>
        </mesh>
      )}
    </group>
  );
};

export const ProductPreview = ({
  productType,
  customImage,
  customText
}: ProductPreviewProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Product Preview</h2>
      
      <div className="aspect-square bg-gray-100 rounded-lg mb-4">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model productType={productType} customImage={customImage} customText={customText} />
            <OrbitControls enableZoom={true} enablePan={true} />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Product: {productType}</li>
          <li>Custom design: {customImage ? 'Yes' : 'No'}</li>
          <li>Custom text: {customText && customText.length > 0 ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};
