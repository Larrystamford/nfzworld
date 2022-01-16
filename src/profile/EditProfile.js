import React, { useRef, useEffect, useState, Suspense } from 'react'
import './App.scss'
//Components
import HeaderEdit from '../components/HeaderEdit'
import Header from '../components/header'
import { Section } from '../components/section'
import ChooseWallet from '../components/wallet/ChooseWallet'
import useMetaMask from '../customHooks/useMetaMask'
import { Closet } from './Closet'
// Page State
import state from '../components/state'
// R3F
import { Canvas, useFrame } from '@react-three/fiber'

import { Html, useProgress, useGLTF } from '@react-three/drei'

// React Spring
import { a, useTransition } from '@react-spring/web'
//Intersection Observer
import { useInView } from 'react-intersection-observer'
import axios from '../axios'
import { getOpenseaNFTs } from '../utils/utils'
import { ConnectAccount } from './ConnectAccount'
import { useNavigate } from 'react-router-dom'
import { useDidMountEffect } from '../customHooks/useDidMountEffect'
import { modelSelection } from './utils'

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

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
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
        <mesh ref={ref} position={[0, 0, 0]} scale={[13, 13, 13]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
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

export const EditProfile = () => {
  const [events, setEvents] = useState()
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [itemSelection, setItemSelection] = useState(null) // 0,1,2

  const [openCloset, setOpenCloset] = useState(false)
  const handleOpenCloset = () => {
    setOpenCloset(true)
  }
  const handleCloseCloset = () => {
    setOpenCloset(false)
    setItemSelection(null)
  }

  const [openAccount, setOpenAccount] = useState(false)
  const handleOpenAccount = () => {
    setOpenAccount(true)
  }
  const handleCloseAccount = () => {
    setOpenAccount(false)
  }

  const navigate = useNavigate()
  const {
    connect,
    disconnect,
    isActive,
    account,
    shouldDisable,
  } = useMetaMask()
  useEffect(() => {
    if (!account) {
      setOpenAccount(true)
    }
  }, [account])

  const [iconSelection, setIconSelection] = useState('star') // star, pet, furniture

  const [featuredNfts, setFeaturedNfts] = useState([])
  const [nftIcons, setNftIcons] = useState([])
  const [userObj, setUserObj] = useState({})

  const getAllProjects = async () => {
    const allProjects = await axios.get('/v1/projects/get')
    setFeaturedNfts(allProjects.data)
  }

  const getOwnerNfts = async (walletAddress) => {
    const ownerNfts = await getOpenseaNFTs(walletAddress)
    setNftIcons(ownerNfts)
  }

  const [username, setUsername] = useState('')
  const [userWallet, setUserWallet] = useState('')
  const [modelChoice, setModelChoice] = useState('defaultAvatar.glb') // .glb

  useEffect(async () => {
    getAllProjects()
    const username = window.location.pathname.split('/')[1]
    if (username !== 'account') {
      // username profile
      setUsername(username)
      const user = await axios.get(
        `/v1/walletToUser/getWalletAddressByUsername?username=${username}`,
      )
      if (user.data.walletAddress) {
        getOwnerNfts(user.data.walletAddress)
        setUserWallet(user.data.walletAddress)
      } else {
        navigate('/')
      }
    } else {
      // account sign in with metamask
      if (account) {
        getOwnerNfts(account)
        setUserWallet(account)
        const user = await axios.get(
          `/v1/walletToUser/getUsernameByWalletAddress?walletAddress=${account}`,
        )
        setUsername(user.data.username)
      }
    }
  }, [account])

  useDidMountEffect(async () => {
    if (username) {
      const user = await axios.get(
        `/v1/users/getByUsername?username=${username}`,
      )
      const modelFile = modelSelection(user.data.equiped)
      setModelChoice(modelFile)
      setUserObj(user.data)
    }
  }, [username])

  console.log(userObj.twitterUsername, 'wow')
  const [openTwitter, setOpenTwitter] = useState(false)

  useDidMountEffect(() => {
    if (iconSelection === 'star') {
      getAllProjects()
      getOwnerNfts(userWallet)
    } else if (iconSelection === 'pet') {
      setFeaturedNfts([])
      setNftIcons([])
    } else if (iconSelection === 'furniture') {
      setFeaturedNfts([])
      setNftIcons([])
    }
  }, [iconSelection])

  return (
    <>
      {username ? <Header /> : <HeaderEdit />}
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor="black"
            modelPath={'/models/' + modelChoice}
            position={250}
          ></HTMLContent>
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
        <div style={{ height: '90vh' }} />
        <button onClick={handleOpenCloset}>
          {openCloset ? (
            <img className="scrollPosition" src="/openScroll.png" />
          ) : (
            <img className="scrollPosition" src="/closeScroll.png" />
          )}
        </button>
        {userObj && userObj.twitterUsername && !openTwitter ? (
          <button onClick={() => setOpenTwitter(true)}>
            <img className="twitterPosition" src="/twitter.png" />
          </button>
        ) : userObj && userObj.twitterUsername && openTwitter ? (
          <button
            onClick={() => {
              setOpenTwitter(false)
              window.open(
                'https://twitter.com/' + userObj.twitterUsername,
                '_blank',
              )
            }}
          >
            <div className="twitterUsernameContainer">
              <img className="innerTwitterIcon" src="/twitter.png" />
              <p>@{userObj.twitterUsername}</p>
            </div>
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <Closet
        username={username}
        openCloset={openCloset}
        setOpenCloset={setOpenCloset}
        handleOpenCloset={handleOpenCloset}
        handleCloseCloset={handleCloseCloset}
        iconSelection={iconSelection}
        setIconSelection={setIconSelection}
        featuredNfts={featuredNfts}
        nftIcons={nftIcons}
        itemSelection={itemSelection}
        setItemSelection={setItemSelection}
        userObj={userObj}
        setModelChoice={setModelChoice}
      />
      {!username && (
        <ConnectAccount
          openAccount={openAccount}
          setOpenAccount={setOpenAccount}
          handleOpenAccount={handleOpenAccount}
          handleCloseAccount={handleCloseAccount}
        />
      )}
    </>
  )
}
