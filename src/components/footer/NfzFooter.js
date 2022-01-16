import React from 'react'
import './index.scss'

export default function NfzFooter() {
  return (
    <div className="footerContainer">
      <p className="footerDesc">How to Support Us</p>
      <div className="footerSocials">
        <img
          className="footerIcon"
          src="/twitter.png"
          onClick={() => window.open('https://twitter.com/nfzworld', '_blank')}
        />
        <img
          className="footerIcon"
          src="/discord.png"
          onClick={() =>
            window.open(
              'https://discord.com/channels/932010568607465483/932010568607465485',
              '_blank',
            )
          }
        />
        <img
          className="footerIcon"
          src="/apple-touch-icon.png"
          style={{ height: '1.8rem', width: '1.8rem' }}
          onClick={() =>
            window.open(
              'https://nfz.world/launchpad/NfzFirstEditionFoundersUndies',
              '_blank',
            )
          }
        />
      </div>
    </div>
  )
}
