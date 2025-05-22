
import React from 'react';
import { Text as DreiText } from '@react-three/drei';

interface TextProps {
  children: React.ReactNode;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
}

const Text = ({ children, position = [0, 0, 0], fontSize = 0.1, color = "black" }: TextProps) => {
  return (
    <DreiText
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </DreiText>
  );
};

export default Text;
