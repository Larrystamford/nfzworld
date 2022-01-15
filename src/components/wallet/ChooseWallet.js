import React, { useState, useEffect } from 'react'
import './wallet.scss'
import useMetaMask from '../../customHooks/useMetaMask'
import axios from '../../axios'
import CircularProgress from '@mui/material/CircularProgress'

export default function ChooseWallet({
  handleCloseAccount,
  noUsername,
  setNoUsername,
}) {
  const {
    connect,
    disconnect,
    isActive,
    account,
    shouldDisable,
  } = useMetaMask()

  const [username, setUsername] = useState('')
  const [twitterUsername, setTwitterUsername] = useState('')
  const handleChange = (e) => {
    setUsername(e.target.value)
    setUsernameTaken(false)
  }
  const handleChangeTwitter = (e) => {
    setTwitterUsername(e.target.value)
  }

  const [usernameTaken, setUsernameTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    const userData = await axios.get(
      `/v1/walletToUser/getWalletAddressByUsername?username=${username}`,
    )
    if (username === '') {
      alert('username cannot be empty')
    } else if (userData.data.walletAddress === '') {
      try {
        await axios.post(`/v1/walletToUser/post`, {
          walletAddress: account,
          username: username,
        })
        await axios.post(`/v1/users/post`, {
          username: username,
          twitterUsername: twitterUsername,
          walletsAddress: [account],
        })

        handleCloseAccount()
      } catch {
        alert('server error: please try again')
      }
    } else {
      setUsernameTaken(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    const getUserData = async () => {
      if (account) {
        const user = await axios.get(
          `/v1/walletToUser/getUsernameByWalletAddress?walletAddress=${account}`,
        )
        if (user.data.username === '') {
          setNoUsername(true)
        } else {
          setUsername(user.data.username)
          handleCloseAccount()
        }
      }
    }
    getUserData()
  }, [account])

  return (
    <div className="walletBody">
      {noUsername ? (
        <div>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={handleChange}
            style={
              usernameTaken
                ? {
                    width: '100%',
                    height: '3rem',
                    fontSize: '18px',
                    marginBottom: '8px',
                    fontFamily: 'Montserrat',
                    outline: 'none',
                    border: 0,
                    borderBottom: '1px solid maroon',
                    background: 'transparent',
                  }
                : {
                    width: '100%',
                    height: '3rem',
                    fontSize: '18px',
                    marginBottom: '8px',
                    fontFamily: 'Montserrat',
                    outline: 'none',
                    border: 0,
                    borderBottom: '1px solid grey',
                    background: 'transparent',
                  }
            }
          />
          <div className="centeringDiv" style={{ marginBottom: '1rem' }}>
            {usernameTaken && (
              <span style={{ color: 'maroon', fontSize: '12px' }}>
                username taken
              </span>
            )}
          </div>
          <input
            placeholder="Twitter Username"
            type="text"
            value={twitterUsername}
            onChange={handleChangeTwitter}
            style={{
              width: '100%',
              height: '3rem',
              fontSize: '18px',
              marginBottom: '8px',
              fontFamily: 'Montserrat',
              outline: 'none',
              border: 0,
              borderBottom: '1px solid grey',
              background: 'transparent',
            }}
          />

          <div className="centeringDiv" style={{ marginBottom: '1rem' }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <button className="titleButton" onClick={handleSave}>
                Save
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <button
            className="walletRowBody"
            onClick={connect}
            disabled={shouldDisable}
          >
            <div className="walletRow">
              <img
                src="images/metamask.svg"
                alt="MetaMask"
                width="30"
                height="30"
              />
              <p style={{ marginLeft: '13px' }}>MetaMask</p>
            </div>
          </button>
          <button className="walletRowBody" disabled={shouldDisable}>
            <div className="walletRow">
              <img
                src="images/coinbase_logo.png"
                alt="MetaMask"
                width="30"
                height="30"
                style={{ opacity: 0.5 }}
              />
              <p style={{ marginLeft: '13px', opacity: 0.4 }}>
                Coinbase Wallet
              </p>
            </div>
          </button>
          <div className="walletRow" style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '13px', textAlign: 'center' }}>
              we only requests for read permission to verify the nfts you own
            </p>
          </div>
        </>
      )}
    </div>
  )
}
