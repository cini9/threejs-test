import { useScroll, Text, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Helmet } from './Helmet'


function Scene({ scrollPos }) {

  const lineRef = useRef()
  const textRef = useRef()

  const points = []
  points.push(new THREE.Vector3(1, 0, 0))
  points.push(new THREE.Vector3(1, 1, 0))
  points.push(new THREE.Vector3(2, 1, 0))

  useFrame(({ camera }) => {


  })

  // <Text color="black" position={[0, 0, 0]} fontSize={0.1} maxWidth={2} lineHeight={1.5}>
  //       A long time ago in a galaxy far, far away....
  //       It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
  //       During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, and space station with enough power to destroy an entire planet.
  //       Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy
  //     </Text>

  return (
    <React.Fragment>
      <Helmet scrollPos={scrollPos} />
    </React.Fragment>
  )
}

export { Scene }
