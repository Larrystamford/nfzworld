import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'

import { useWindowSize } from './customHooks/useWindowSize'
import { Home } from './Home'
import { Profile } from './profile/Profile'
import { EditProfile } from './profile/EditProfile'

import { MetaverseGuarantee } from './terms/MetaverseGuarantee'
import { Creators } from './creators/Creators'
import { Brands } from './brands/Brands'
import { ShowRoom } from './showroom/ShowRoom'

function App() {
  const size = useWindowSize()
  document.documentElement.style.setProperty('--vh', `${size.height * 0.01}px`)

  return (
    <Router>
      {/* <Route path={['/']} exact component={Home} /> */}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/larrystamford" element={<Profile />} />
        <Route path="/account" element={<EditProfile />} />
        <Route path="/roadmap" element={<MetaverseGuarantee />} />

        <Route path="/for-creators" element={<Creators />} />
        <Route path="/for-brands" element={<Brands />} />
        <Route path="/launchpad/:id" element={<ShowRoom />} />

        <Route path="/:id" element={<EditProfile />} />
      </Routes>
    </Router>
  )
}

export default App
