import React, { useRef, useEffect, useState } from "react";
import { Box, Input, Button, ChakraProvider, Text, Flex } from "@chakra-ui/react";
import Canvas from "./Canvas";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSpring, animated } from "react-spring";

function App() {
  const [color, setColor] = useState("black");
  const [passed, setPassed] = useState(false);

  const { x } = useSpring({ from: { x: 0 }, x: color === "white" ? 1 : 0, config: { duration: 500 } });

  const parallax = useRef();
  const scrollPos = useRef()
  const parallaxLayer = useRef()

  const textRef1 = useRef()
  const textRef2 = useRef()
  const textRef3 = useRef()
  const textRef4 = useRef()

  const handleScroll = () => {
    if (parallax.current) {
      scrollPos.current = parallax.current.current / window.innerHeight
    }

    const element = document.getElementById("my-element-1");
    const bounding = element.getBoundingClientRect();

    if (bounding.top < 700 && bounding.top > 400 && !passed) {
      setColor("white");
      setPassed(true)
    } else if (bounding.top >= 700 || bounding.top < 400) {
      setColor("black");
      setPassed(false)
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
      <Parallax ref={parallax} pages={8} className='parallax'>
        <ParallaxLayer ref={parallaxLayer} offset={0} factor={2} style={{ background: 'pink' }}>
          <Flex justifyContent='center' h='full' alignItems='center'>
            <Box w='60%'>
              <animated.p
                id='my-element-1'
                ref={textRef1}
                style={{ fontSize: 32, color: x.to({ range: [0, 1], output: ["black", "white"] }) }}>
                A long time ago in a galaxy far, far away....
              </animated.p>
              <Text fontSize={32} ref={textRef2} color="black" >
                It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
              </Text>
              <Text fontSize={32} ref={textRef3} color="black" >
                During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, and space station with enough power to destroy an entire planet.
              </Text>
              <Text fontSize={32} ref={textRef4} color="black" >
                Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy
              </Text>
            </Box>
          </Flex>
        </ParallaxLayer>
        <ParallaxLayer offset={2} sticky={{ start: 2, end: 6 }}>
          <Canvas scrollPos={scrollPos} />
        </ParallaxLayer>
        <ParallaxLayer offset={7}>
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
