import React from 'react'
import { useNavigate } from 'react-router-dom'
import useMetaMask from '../customHooks/useMetaMask'

export default function HeaderEdit() {
  const navigate = useNavigate()
  const {
    connect,
    disconnect,
    isActive,
    account,
    shouldDisable,
  } = useMetaMask()

  console.log(account, 'hello')

  return (
    <header>
      <div className="header-inner">
        <div className="logo" onClick={() => navigate('/')}>
          WORLD.
        </div>
        {account ? (
          <button className="ProfileCircle">
            <img className="ProfileCircle" src="/profile_circle.jpg" />
          </button>
        ) : (
          <button className="ButtonStyle" onClick={connect}>
            Connect
          </button>
        )}
      </div>
    </header>
  )
}
