import React, { useRef, useMemo, useEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

export function HelmetReduced({ scrollPos }) {
  const helmetGroup = useRef();
  const opaqueGroup = useRef()
  const membraneRef = useRef();

  const { nodes, materials } = useGLTF("/BauerV3Full.glb");

  const helmetMaterials = useMemo(() => {
    const newMaterials = {}
    Object.keys(materials).map(key => {
      newMaterials[key] = new THREE.MeshStandardMaterial({ ...materials[key], transparent: true, opacity: 1 })
    })
    return newMaterials
  }, [materials])

  useFrame(() => {
    if (scrollPos.current > 2 && scrollPos.current < 3) {
      helmetGroup.current.rotation.y = Math.PI * (scrollPos.current - 2) / 4
    }

    if (scrollPos.current > 4 && scrollPos.current < 5) {
      membraneRef.current.material.color = new THREE.Color(5 - scrollPos.current, 0, 0)
    }  
  })

  return (
    <group ref={helmetGroup} dispose={null} position={[-2, -0.5, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bv3PC.geometry}
        material={nodes.Bv3PC.material}
        position={[0, -0.18, -0.68]}
        rotation={[3.02, 0, 0]}
        scale={[0.51, 0.45, 0.51]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BV3Faom.geometry}
        material={nodes.BV3Faom.material}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bv3CoqueExt.geometry}
        material={materials["Default OBJ"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/BauerV3Full.glb");
