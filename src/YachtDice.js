import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useLoader, useUpdate, useFrame } from 'react-three-fiber'
import { makeStyles } from '@material-ui/core/styles';
import { Physics, usePlane, useBox } from 'use-cannon'
import * as THREE from "three";
import niceColors from 'nice-color-palettes'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import bold from './assets/bold.blob'
import oneImg from './assets/1.png'
import twoImg from './assets/2.png'
import threeImg from './assets/3.png'
import fourImg from './assets/4.png'
import fiveImg from './assets/5.png'
import sixImg from './assets/6.png'
import Button from '@material-ui/core/Button';

RectAreaLightUniformsLib.init()

const makeUrl = file => `https://raw.githubusercontent.com/xpekfdls/Yacht-Dice-React/master/src/assets/${file}.png`

var isEnd = false;

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function Plane({ color, ...props }) {
  const [ref] = usePlane(() => ({ material:{restitution:0}, ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  )
}

function Dices(props) {
  const seed = 42;

  const [ref1, api1] = useBox(() => ({ mass: 5, material:{friction:0.1, restitution:1}, 
    position: [random(seed)*3,  random(seed), random(seed)*5+15],
    rotation: [random(seed) *2, random(seed) * 2, random(seed) *2], ...props }))
  const [ref2, api2] = useBox(() => ({ mass: 5, material:{friction:0.1, restitution:1}, 
    position: [random(seed)*3,  random(seed), random(seed)*5+15],
    rotation: [random(seed) *2, random(seed) * 2, random(seed) *2], ...props }))
  const [ref3, api3] = useBox(() => ({ mass: 5, material:{friction:0.1, restitution:1}, 
    position: [random(seed)*3,  random(seed), random(seed)*5+15],
    rotation: [random(seed) *2, random(seed) * 2, random(seed) *2], ...props }))
  const [ref4, api4] = useBox(() => ({ mass: 5, material:{friction:0.1, restitution:1}, 
    position: [random(seed)*3,  random(seed), random(seed)*5+15],
    rotation: [random(seed) *2, random(seed) * 2, random(seed) *2], ...props }))
  const [ref5, api5] = useBox(() => ({ mass: 5, material:{friction:0.1, restitution:1}, 
    position: [random(seed)*3,  random(seed), random(seed)*5+15],
    rotation: [random(seed) *2, random(seed) * 2, random(seed) *2], ...props }))

  const ref = [ref1, ref2, ref3, ref4, ref5];
  
  var [textureCube1] = useLoader(THREE.TextureLoader, [oneImg])
  var [textureCube2] = useLoader(THREE.TextureLoader, [twoImg])
  var [textureCube3] = useLoader(THREE.TextureLoader, [threeImg])
  var [textureCube4] = useLoader(THREE.TextureLoader, [fourImg])
  var [textureCube5] = useLoader(THREE.TextureLoader, [fiveImg])
  var [textureCube6] = useLoader(THREE.TextureLoader, [sixImg])

  const [active, setActive] = useState([false, false, false, false, false])
  const [mount, setMount] = useState(false);

  const onClickDice1 = () => {
    setActive([!active[0], active[1], active[2], active[3], active[4]])
  }
  const onClickDice2 = () => {
    setActive([active[0], !active[1], active[2], active[3], active[4]])
  }
  const onClickDice3 = () => {
    setActive([active[0], active[1], !active[2], active[3], active[4]])
  }
  const onClickDice4 = () => {
    setActive([active[0], active[1], active[2], !active[3], active[4]])
  }
  const onClickDice5 = () => {
    setActive([active[0], active[1], active[2], active[3], !active[4]])
  }

  var prev_dice_pos = [10,10,10,10,10];
  var dist = 100;

  useFrame(()=>{
    if(prev_dice_pos[0] < 0.1)
    {
      dist = 0;
      ref.forEach((ref, index)=> {
        dist = dist + Math.abs(ref.current.quaternion._x)
        +Math.abs(ref.current.quaternion._y)+Math.abs(ref.current.quaternion._z)
        -prev_dice_pos[index]
      })
      if(Math.abs(dist) < 0.0001){
        console.log("Finish")
      }
    }
      ref.forEach((ref, index)=> {
        prev_dice_pos[index] = Math.abs(ref.current.quaternion._x)
        +Math.abs(ref.current.quaternion._y)+Math.abs(ref.current.quaternion._z)
      })
  })

  return (
    <group>
      <mesh receiveShadow castShadow
      ref = {ref1}
      onClick={onClickDice1}
      >
        <boxGeometry attach="geometry"/>
        <meshBasicMaterial attachArray="material" map={textureCube1} color={active[0]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube2} color={active[0]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube3} color={active[0]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube4} color={active[0]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube5} color={active[0]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube6} color={active[0]? "orange": "white"}/>
      </mesh>
      <mesh receiveShadow castShadow
      ref = {ref2}
      onClick={onClickDice2}
      >
        <boxGeometry attach="geometry"/>
        <meshBasicMaterial attachArray="material" map={textureCube1} color={active[1]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube2} color={active[1]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube3} color={active[1]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube4} color={active[1]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube5} color={active[1]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube6} color={active[1]? "orange": "white"}/>
      </mesh>
      <mesh receiveShadow castShadow
      ref = {ref3}
      onClick={onClickDice3}
      >
        <boxGeometry attach="geometry"/>
        <meshBasicMaterial attachArray="material" map={textureCube1} color={active[2]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube2} color={active[2]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube3} color={active[2]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube4} color={active[2]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube5} color={active[2]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube6} color={active[2]? "orange": "white"}/>
      </mesh>
      <mesh receiveShadow castShadow
      ref = {ref4}
      onClick={onClickDice4}
      >
        <boxGeometry attach="geometry"/>
        <meshBasicMaterial attachArray="material" map={textureCube1} color={active[3]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube2} color={active[3]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube3} color={active[3]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube4} color={active[3]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube5} color={active[3]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube6} color={active[3]? "orange": "white"}/>
      </mesh>
      <mesh receiveShadow castShadow
      ref = {ref5}
      onClick={onClickDice5}
      >
        <boxGeometry attach="geometry"/>
        <meshBasicMaterial attachArray="material" map={textureCube1} color={active[4]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube2} color={active[4]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube3} color={active[4]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube4} color={active[4]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube5} color={active[4]? "orange": "white"}/>
        <meshBasicMaterial attachArray="material" map={textureCube6} color={active[4]? "orange": "white"}/>
      </mesh>
    </group>
  )
}


export default function YachtDice() {


    return(
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [0, 0, 15], fov: 50 }}>        
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

        {
            <Physics gravity={[0, 0, -80]}>
              <Dices />
              <Plane color={niceColors[17][4]} />
              <Plane color={niceColors[17][1]} position={[-4, 0, 0]} rotation={[0, 0.8, 0]} />
              <Plane color={niceColors[17][2]} position={[4, 0, 0]} rotation={[0, -0.8, 0]} />
              <Plane color={niceColors[17][3]} position={[0, 4, 0]} rotation={[0.8, 0, 0]} />
              <Plane color={niceColors[17][0]} position={[0, -4, 0]} rotation={[-0.8, 0, 0]} />
              
            </Physics>
        }        
      </Canvas>
    )
}

