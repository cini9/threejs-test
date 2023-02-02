import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Box, Input, Button, ChakraProvider } from "@chakra-ui/react";
import Canvas from "./Canvas";

function App() {
  const [scrollPos, setScrollPos] = useState(0);

  const canvasRef = useRef();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'pink'
    }}>
      <Canvas />
    </div>
  );
}

export default App;
