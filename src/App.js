import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Box, Input, Button, ChakraProvider } from "@chakra-ui/react";
import Canvas from "./Canvas";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function App() {
  const parallax = useRef();
  const scrollPos = useRef()

  const handleScroll = () => {
    if (parallax.current) {
      scrollPos.current = parallax.current.current / window.innerHeight
    }
  }

  useEffect(() => {
    const container = document.querySelector('.parallax')
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ChakraProvider>
      <Parallax ref={parallax} pages={6} className='parallax'>
        <ParallaxLayer offset={0} sticky={{ start: 0, end: 4 }}>
          <Canvas scrollPos={scrollPos} />
        </ParallaxLayer>
        <ParallaxLayer offset={5}>
          <Box>
            <Input variant='filled' />
            <Input variant='filled' />
            <Button onClick={() => console.log('clicked this shit')} >Click me</Button>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={5.9} style={{ width: '100%', height: 100, background: 'red' }}>
          <Box>Footer</Box>
        </ParallaxLayer>
      </Parallax>
    </ChakraProvider>
  );
}

export default App;
