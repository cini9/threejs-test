import { useScroll, Text, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Helmet } from './Helmet'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

function Scene({ scrollPos }) {

  const textGroup = useRef()
  const textRef1 = useRef()
  const textRef2 = useRef()
  const textRef3 = useRef()
  const textRef4 = useRef()

  const points = []
  points.push(new THREE.Vector3(1, 0, 0))
  points.push(new THREE.Vector3(1, 1, 0))
  points.push(new THREE.Vector3(2, 1, 0))

  const raycaster = new THREE.Raycaster()
  const rayOrigin = new THREE.Vector3(0, 0, 3)
  const rayDirection = new THREE.Vector3(0, 0, -1)
  rayDirection.normalize()
  raycaster.set(rayOrigin, rayDirection)
  
  useFrame(({ camera }) => {
    if (scrollPos.current) {
      textGroup.current.position.y = -3 + (scrollPos.current * 2)
    }

    const objectsToTest = [textRef1.current, textRef2.current, textRef3.current, textRef4.current]

    const intersects = raycaster.intersectObjects(objectsToTest)

    objectsToTest.forEach(object => {
      object.color = 'black'
    })

    intersects.forEach(intersect => {
      intersect.object.color = 'white'
    })

  })

  return (
    <React.Fragment>
      <axesHelper />
      <group ref={textGroup} position-y={-3}>
        <Text ref={textRef1} color="black" position={[0, 0, 0]} fontSize={0.1} maxWidth={1.5} lineHeight={1.5}>
          A long time ago in a galaxy far, far away....
        </Text>
        <Text ref={textRef2} color="black" position={[0, -0.5, 0]} fontSize={0.1} maxWidth={1.5} lineHeight={1.5}>
          It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
        </Text>
        <Text ref={textRef3} color="black" position={[0, -1.35, 0]} fontSize={0.1} maxWidth={1.5} lineHeight={1.5}>
          During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, and space station with enough power to destroy an entire planet.
        </Text>
        <Text ref={textRef4} color="black" position={[0, -2.25, 0]} fontSize={0.1} maxWidth={1.5} lineHeight={1.5}>
          Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy
        </Text>
      </group>
    </React.Fragment>
  )
}

export { Scene }
