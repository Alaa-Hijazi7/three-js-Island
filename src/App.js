import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import "./App.css";

extend({ OrbitControls });

function SpaceShip() {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel);
  }, []);
  console.log(model);
  return model ? <primitive object={model.scene} /> : null;
}

function Controls() {
  const orbitRef= useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  })

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

export default function App() {
  return (
    <>
      <Canvas camera={{position: [20, 10, 5]}} onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}>
        <Controls />
        <ambientLight />
        <spotLight castShadow position={[15, 20, 5]} penumbra={1} />
        <SpaceShip />
      </Canvas>
    </>
  )
}
