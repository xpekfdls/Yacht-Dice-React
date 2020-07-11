import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { makeStyles } from '@material-ui/core/styles';
import { Physics, usePlane, useBox } from 'use-cannon'
import * as THREE from "three";

import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

RectAreaLightUniformsLib.init()

const makeUrl = file => `https://raw.githubusercontent.com/xpekfdls/Yacht-Dice-React/master/src/assets/${file}.png`

const useStyles = makeStyles({
  canvas: {
  },
});

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 5, material:{friction:10, restitution:0.4}, position: [0, 5, 0], ...props }))
  
  console.log("Hello");
  var [textureCube] = useLoader(THREE.TextureLoader, [
    makeUrl('1'),  
  ])

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" map={textureCube} color={"white"}/>
    </mesh>
  )
}

function Edge(props){
  const geom = useMemo(() => new THREE.DodecahedronBufferGeometry(1, 1))
  const [ref] = useBox(() => ({ mass: 5, material:{friction:10, restitution:0.4}, position: [0, 10, 0], ...props }))

  return(
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geom]} />
        <lineBasicMaterial color="red" attach="material" />
      </lineSegments>
    )
}

export default function YachtDice() {
  const classes = useStyles();
    return(
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-3, 10, 5], fov: 70 }}>
        <color attach="background" args={['#282c34']} />
        <ambientLight color={'#cccccc'} />
        <ambientLight color={'#cccccc'} />
        <Physics>
          <Plane />
          <Cube />
          <Cube position={[0, 10, -2]} />
          <Cube position={[0, 20, -2]} />
          <Edge />
        </Physics>
      </Canvas>
    )
}


        // <hemisphereLight intensity={0.35} />
        // <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
    // const ambientLight = new THREE.AmbientLight(0xcccccc);
    // this.scene.add(ambientLight);

    // const foreLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // foreLight.position.set(5, 5, 20);
    // this.scene.add(foreLight);

    // const backLight = new THREE.DirectionalLight(0xffffff, 1);
    // backLight.position.set(-5, -5, -10);
    // this.scene.add(backLight);