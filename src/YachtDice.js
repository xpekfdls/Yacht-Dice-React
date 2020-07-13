import React, { useState } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { makeStyles } from '@material-ui/core/styles';
import { Physics, usePlane, useBox } from 'use-cannon'
import * as THREE from "three";
import niceColors from 'nice-color-palettes'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import bold from './assets/bold.blob'

RectAreaLightUniformsLib.init()

const makeUrl = file => `https://raw.githubusercontent.com/xpekfdls/Yacht-Dice-React/master/src/assets/${file}.png`

var isEnd = false;


function Plane({ color, ...props }) {
  const [ref] = usePlane(() => ({ material:{restitution:0.1}, ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  )
}

function Cube(props) {
  const [ref, api] = useBox(() => ({ mass: 5, material:{friction:0, restitution:1}, 
    position: [Math.random()*3,  Math.random(), Math.random()*5+5],
    rotation: [Math.random() *2, Math.random() * 2, Math.random() *2], ...props }))
  
  var [textureCube] = useLoader(THREE.TextureLoader, [
    makeUrl('1'),  
  ])

  const [active, setActive] = useState(false)

  return (
    <mesh receiveShadow castShadow ref={ref}
    onClick={(e) => setActive(!active)}

    >
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" map={textureCube} color={active ? 'orange' : 'white'}/>
    </mesh>
  )
}

export default function YachtDice() {
    return(
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [0, 0, 10], fov: 70 }}>
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
          <Physics gravity={[0, 0, 0]} >
            <Cube position ={[-4,4,1]} rotation={[0, 0, 0]} />
            <Cube position ={[-2,4,1]} rotation={[0, 0, 0]} />
            <Cube position ={[0,4,1]} rotation={[0, 0, 0]} />

          </Physics>

        {
          isEnd 
          ?
            <Physics gravity={[0, 0, 0]} >

              <Cube position ={[-8,0,3]} rotation={[0, 0, 0]} />
              <Cube position ={[-5,0,3]} rotation={[0, 0, 0]} />
              <Cube position ={[-2,0,3]} rotation={[0, 0, 0]} />
              <Cube position ={[1,0,3]} rotation={[0, 0, 0]} />
              <Cube position ={[4,0,3]} rotation={[0, 0, 0]} />

              <Plane color={niceColors[17][4]} />
              <Plane color={niceColors[17][1]} position={[-10, 0, 0]} rotation={[0, 0.6, 0]} />
              <Plane color={niceColors[17][2]} position={[10, 0, 0]} rotation={[0, -0.6, 0]} />
              <Plane color={niceColors[17][3]} position={[0, 10, 0]} rotation={[0.6, 0, 0]} />
              <Plane color={niceColors[17][0]} position={[0, -10, 0]} rotation={[-0.6, 0, 0]} />
            </Physics>
          :
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
        }

      </Canvas>
    )
}

