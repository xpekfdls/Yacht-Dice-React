import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { makeStyles } from '@material-ui/core/styles';
import { Physics, usePlane, useBox } from 'use-cannon'
import * as THREE from "three";
import niceColors from 'nice-color-palettes'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

RectAreaLightUniformsLib.init()

const makeUrl = file => `https://raw.githubusercontent.com/xpekfdls/Yacht-Dice-React/master/src/assets/${file}.png`

const useStyles = makeStyles({
  canvas: {
  },
});

function Plane({ color, ...props }) {
  const [ref] = usePlane(() => ({ material:{restitution:0.1}, ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  )
}

function Cube(props) {
  const [ref, api] = useBox(() => ({ mass: 5, material:{friction:10, restitution:1}, 
    position: [Math.random()*3,  Math.random(), Math.random()*10],
    rotation: [Math.random() *2, Math.random() * 2, Math.random() *2], ...props }))
  
  var [textureCube] = useLoader(THREE.TextureLoader, [
    makeUrl('1'),  
  ])

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" map={textureCube}/>
    </mesh>
  )
}

export default function YachtDice() {
  const classes = useStyles();
    return(
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [0, -12, 16] }}>
        <color attach="background" args={['#282c34']} />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[30, 0, 30]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <Physics gravity={[0, 0, -30]}>
          <Cube />
          <Cube />
          <Cube />
          <Cube />
          <Cube />
          <Plane color={niceColors[17][4]} />
          <Plane color={niceColors[17][1]} position={[-6, 0, 0]} rotation={[0, 0.9, 0]} />
          <Plane color={niceColors[17][2]} position={[6, 0, 0]} rotation={[0, -0.9, 0]} />
          <Plane color={niceColors[17][3]} position={[0, 6, 0]} rotation={[0.9, 0, 0]} />
          <Plane color={niceColors[17][0]} position={[0, -6, 0]} rotation={[-0.9, 0, 0]} />
          
        </Physics>
      </Canvas>
    )
}

