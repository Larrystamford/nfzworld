import React, { useRef, useEffect, useState, Suspense } from 'react'
import './App.scss'
//Components
import Header from '../components/header'
import { Section } from '../components/section'

// Page State
import state from '../components/state'

// R3F
import { Canvas, useFrame } from '@react-three/fiber'

import { Html, useProgress, useGLTF } from '@react-three/drei'

// React Spring
import { a, useTransition } from '@react-spring/web'
//Intersection Observer
import { useInView } from 'react-intersection-observer'

function Model({ url }) {
  const gltf = useGLTF(url, true)
  return <primitive object={gltf.scene} dispose={null} />
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  )
}

const ObjHTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
  changingWord,
}) => {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))
  const [refItem, inView] = useInView({
    threshold: 0,
  })
  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView])
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -50, 0]} scale={[17, 17, 17]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="titleContainer">
            <h1 className="titleH1">
              Your
              <span
                className="titleH1Color"
                style={{ color: '#871F78', opacity: 0.98 }}
              >
                {changingWord}
              </span>
            </h1>
            <h1 className="titleH1">Come to Life</h1>
            <button
              className="titleButton"
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLScZMfOjobfkmeI_3sT-o5fki5wyOGl7sYOodVeVSJu30k77RQ/viewform?usp=sf_link',
                  '_blank',
                )
              }
            >
              CONTACT
            </button>
          </div>
        </Html>
      </group>
    </Section>
  )
}

function Loader() {
  const { active, progress } = useProgress()
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  })
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      ),
  )
}

export const Creators = () => {
  const [events, setEvents] = useState()
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  const [changingWord, setChangingWord] = useState('Creation')
  let changingWordCount = 0
  const changingWords = ['Creation', 'Art', 'NFT']
  useEffect(() => {
    const interval = setInterval(() => {
      changingWordCount += 1
      setChangingWord(changingWords[changingWordCount % changingWords.length])
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <ObjHTMLContent
            domContent={domContent}
            bgColor="black"
            modelPath="/CreatorWolf.gltf"
            position={250}
            changingWord={changingWord}
          ></ObjHTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: '100vh' }} />
      </div>
    </>
  )
}
