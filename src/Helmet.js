import React, { useRef, useMemo, useEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

export function Helmet() {
  const helmetGroup = useRef();
  const opaqueGroup = useRef()
  const { nodes, materials } = useGLTF("/BM_All.glb");

  const scroll = useScroll()

  const helmetMaterials = useMemo(() => {
    const newMaterials = {}
    Object.keys(materials).map(key => {
      newMaterials[key] = new THREE.MeshStandardMaterial({ ...materials[key], transparent: true, opacity: 1 })
    })
    return newMaterials
  }, [materials])


  useFrame(() => {
    const r1 = scroll.range(0, 1 / 6)
    const r2 = scroll.range(1 / 6, 1 / 6)

    if (scroll.visible(0, 1 / 6)) {
      helmetGroup.current.rotation.y = Math.PI * r1 / 4
    }

    if (scroll.visible(1 / 6, 1 / 6)) {
      opaqueGroup.current.children.forEach(child => child.material.opacity = 1 - r2)
    }
  })

  return (
    <group ref={helmetGroup} scale={5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BM_ElectronicsParts.geometry}
        material={helmetMaterials.BM_ElectronicsParts}
      />
      <group ref={opaqueGroup}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BM_Membrane.geometry}
          material={helmetMaterials.BM_Membrane}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006"].geometry}
          material={helmetMaterials.BM_HelmetScrews}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006_1"].geometry}
          material={helmetMaterials.BM_HelmetPlastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Hockey_Helmet_Bauer_Re-Akt006_2"].geometry}
          material={helmetMaterials.BM_HelmetGlass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BM_Pad.geometry}
          material={helmetMaterials.Bm_FoamPad}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/BM_Helmet.glb");
