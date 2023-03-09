import { useScroll, Text, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect, useState } from 'react'
import { Model } from './Model'
import { Helmet } from './Helmet'
import { HelmetReduced } from './HelmetReduced'
import { ModelTwo } from './ModelV2'

function Scene({ scrollPos }) {

  useFrame(({ camera }) => {

  })

  return (
    <React.Fragment>
      <axesHelper />
      <OrbitControls />
      {/*<Helmet scrollPos={scrollPos} />*/}
      <ModelTwo />
    </React.Fragment>
  )
}

export { Scene }
