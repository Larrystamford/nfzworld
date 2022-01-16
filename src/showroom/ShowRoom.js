import React, { useState, useEffect } from 'react'
import './App.scss'
import HeaderMove from '../components/HeaderMove'
import { useLocation } from 'react-router-dom'
import axios from '../axios'
import NfzFooter from '../components/footer/NfzFooter'

export const ShowRoom = () => {
  const [project, setProject] = useState(null)
  const { state } = useLocation()
  useEffect(() => {
    const getProject = async () => {
      if (!state) {
        const uniqueShowRoomName = window.location.pathname.split('/')[2]
        const res = await axios.get(
          `/v1/projects/getByProjectUnqiueName?name=${uniqueShowRoomName}`,
        )
        setProject(res.data)
      } else {
        setProject(state)
      }
    }
    getProject()
  }, [state])

  const [fillUpInfo, setFillUpInfo] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (event) => {
    const res = await axios.post('/v1/projects/addToWhitelist', {
      docId: project.id,
      email: email,
    })
    setSubmitted(true)
    setTimeout(() => {
      setFillUpInfo(false)
      setEmail('')
      setSubmitted(false)
    }, 6000)
  }

  return (
    <div className="PageWrapper">
      <HeaderMove />
      {project && (
        <div className="ShowRoomContainer">
          <div className="PointSeparator">
            <h2 className="mainPoint">{project.name}</h2>
            {project.media.map(({ imageLink, videoLink, modelLink }) => (
              <div className="centeringDiv">
                <img
                  className="mainImage"
                  src="/images/nfz-founders-undies-w-bg.png"
                />
              </div>
            ))}

            <p className="subPoint">{project.description}</p>
            {fillUpInfo ? (
              <div className="centeringDiv" style={{ marginBottom: '5rem' }}>
                {submitted ? (
                  <></>
                ) : (
                  <div className="leftDiv">
                    <p>E-mail Whitelist: </p>
                  </div>
                )}

                {submitted ? (
                  <div className="leftDiv">
                    <p>
                      You are all set to receive a unique minting url on our
                      launch date!
                    </p>
                  </div>
                ) : (
                  <input
                    placeholder="Your email address"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '3rem',
                      fontSize: '18px',
                      marginBottom: '8px',
                      fontFamily: 'Montserrat',
                    }}
                  />
                )}
                {submitted ? (
                  <></>
                ) : (
                  <button
                    className="titleButton"
                    onClick={() => handleSubmit()}
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            ) : (
              <div className="centeringDiv" style={{ marginBottom: '5rem' }}>
                <button
                  className="titleButton"
                  onClick={() => setFillUpInfo(true)}
                >
                  EARLY ACCESS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <NfzFooter />
    </div>
  )
}
