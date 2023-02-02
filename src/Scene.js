import { useScroll, Text, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Helmet } from './Helmet'

function Scene() {

  const scroll = useScroll()

  const lineRef = useRef()
  const textRef = useRef()

  const points = []
  points.push(new THREE.Vector3(1, 0, 0))
  points.push(new THREE.Vector3(1, 1, 0))
  points.push(new THREE.Vector3(2, 1, 0))

  useFrame(({ camera }) => {

    // Ranges
    const r1 = scroll.range(0, 1 / 6)
    const r2 = scroll.range(1 / 6, 1 / 6)
    const r3 = scroll.range(2 / 6, 1 / 6)
    const r4 = scroll.range(3 / 6, 1 / 6)
    const r5 = scroll.range(4 / 6, 1 / 6)
    const r6 = scroll.range(5 / 6, 1 / 6)

    // Sections
    const r1Section = scroll.visible(0, 1 / 6)
    const r2Section = scroll.visible(1/6, 1/6)
    const r3Section = scroll.visible(2/6, 1/6)
    const r4Section = scroll.visible(3/6, 1/6)
    const r5Section = scroll.visible(4/6, 1/6)
    const r6Section = scroll.visible(5/6, 1/6)

    // Once the helmet finishes its rotation animate the appearance of the line
    if (r3Section) {
      lineRef.current.geometry
        .setFromPoints([[0.45, 0.45, 0], [0.45 + r3, 0.45 + (r3 * 0.5), 0]]
        .map((point) => new THREE.Vector3(...point)));
    }

    // Once the line appears, animate the appearance and disappearance of the text
    if (r4Section) {
      if (r4 < 0.25) {
        textRef.current.material.opacity = r4 * 4
      }

      if (r4 > 0.75) {
        textRef.current.material.opacity = (1 - r4) * 4
      }
    } else {
      textRef.current.material.opacity = 0
    }

    // Once the text has disappeared, animate the disappearance of the line
    if (r5Section) {
      lineRef.current.geometry
        .setFromPoints([[0.45, 0.45, 0], [1.45 - r5, 0.95 - (r5 * 0.5), 0]]
        .map((point) => new THREE.Vector3(...point)));
    }

    // Once the line has disappeared, move the camera down with the scroll
    if (r6Section) {
      camera.position.y = 0 - (r6 * 2)
    }
  })

  return (
    <React.Fragment>
      <Text ref={textRef} color="black" position={[2.1, 1, 0]} fontSize={0.1} maxWidth={1.2}>
        The helmet is fucking beautiful and super smart
        <meshStandardMaterial attach="material" />
      </Text>

      <axesHelper />

      <Helmet />
      
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="white" linewidth={5} />
      </line>
    </React.Fragment>
  )
}

export { Scene }
