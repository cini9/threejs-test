import { useScroll, Text, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import { Helmet } from './Helmet'

function Scene({ scrollPos }) {

  useFrame(({ camera }) => {

  })

  return (
    <React.Fragment>
      <axesHelper />
      <Helmet scrollPos={scrollPos} />
    </React.Fragment>
  )
}

export { Scene }
