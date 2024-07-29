import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

import * as THREE from "three";
import { useEffect, useRef } from "react";

const Model = () => {
  const glbPath = "/JuneMimo2.glb";
  const { scene } = useLoader(GLTFLoader, glbPath);
  const meshRef = useRef<THREE.Object3D>(null);

  useHelper(meshRef, THREE.BoxHelper, "cyan");

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.add(scene);
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.sub(center); // Center the model
    }
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={1}
      ref={meshRef}
      rotation={[(Math.PI / 180) * -2, 0, 0]}
    />
  );
};

const Scene = () => {
  //const orbitRef = useRef(null);
  const cameraRef = useRef();

  return (
    <Canvas>
      <ambientLight intensity={6} />
      <spotLight position={[20, 20, 20]} angle={0.25} penumbra={1} />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[10, 10, 10]}
        fov={75}
      />
      <Model />
      <OrbitControls
        enablePan={true}
        enableRotate={true}
        enableZoom={true}
        minDistance={0.1}
        maxDistance={100}
        enableDamping={true}
        dampingFactor={0.5}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
};

export default Scene;
