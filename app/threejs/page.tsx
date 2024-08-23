'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, SubtractEquation } from 'three';

const Box = () => {
    const mesh = useRef<Mesh>(null);
    useFrame(() => mesh.current?.rotateX(0.01));
    return (
        <mesh scale={3} ref={mesh}>
            <sphereGeometry />
        </mesh>
    );
};

export default function threejs() {
    return (
        <>
            <label>hello</label>
            <Canvas>
                <ambientLight />
                <Box />
            </Canvas>
        </>
    );
}
