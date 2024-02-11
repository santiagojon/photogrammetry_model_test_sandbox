import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

const Model = () => {
  const glbPath = "/turtle.glb";
  const { scene } = useLoader(GLTFLoader, glbPath);
  console.log(scene);

  return <primitive object={scene} scale={1} />;
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <spotLight position={[20, 20, 20]} angle={0.25} penumbra={1} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
