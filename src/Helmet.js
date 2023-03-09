import React, { useRef, useMemo, useEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

export function Helmet({ scrollPos }) {
  const helmetGroup = useRef();
  const opaqueGroup = useRef()
  const membraneRef = useRef();
  const padRef = useRef()

  const { nodes, materials } = useGLTF("/BM_All.glb");

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

    if (scrollPos.current > 3 && scrollPos.current < 4) {
      opaqueGroup.current.children.forEach(child => child.material.opacity = 1 - (scrollPos.current - 3))
    }

    if (scrollPos.current > 4 && scrollPos.current < 5) {
      membraneRef.current.material.color = new THREE.Color(5 - scrollPos.current, 0, 0)
      padRef.current.material.color = new THREE.Color(0, 0, 5 - scrollPos.current)
    }  
  })

  return (
    <group ref={helmetGroup} scale={5} position={[2, 0, 0]}>
      <mesh
        geometry={nodes.BM_ElectronicsParts.geometry}
        material={helmetMaterials.BM_ElectronicsParts}
      />
      <mesh
        ref={membraneRef}
        geometry={nodes.BM_Membrane.geometry}
        material={helmetMaterials.BM_Membrane}
      />
      <group ref={opaqueGroup}>
        <mesh
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006"].geometry}
          material={helmetMaterials.BM_HelmetScrews}
        />
        <mesh
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006_1"].geometry}
          material={helmetMaterials.BM_HelmetPlastic}
        />
        <mesh
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006_2"].geometry}
          material={helmetMaterials.BM_HelmetGlass}
        />
        </group>
        <mesh
        ref={padRef}
          geometry={nodes.BM_Pad.geometry}
          material={helmetMaterials.Bm_FoamPad}
        />
    </group>
  );
}

useGLTF.preload("/BM_Helmet.glb");
