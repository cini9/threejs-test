import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import React, { Suspense, useEffect } from 'react'
import { Scene } from './Scene'
import { Html, Scroll, ScrollControls } from '@react-three/drei'

export default function Canvas() {

  return (
    <ThreeCanvas camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [ 0, 0, 5 ]
    }}
  >
    <ScrollControls pages={6}>
      <ambientLight />
      <directionalLight position={[ 1, 1, 1 ]} color="white" intensity={7} />
      
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </ScrollControls>
  </ThreeCanvas>
  )
}
