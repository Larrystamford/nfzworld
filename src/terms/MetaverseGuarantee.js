import React from 'react'
import './App.scss'

import HeaderMove from '../components/HeaderMove'

export const MetaverseGuarantee = (props) => {
  return (
    <div className="PageWrapper">
      <HeaderMove />
      <div className="PageContainer">
        <div className="PointSeparator">
          <h2 className="mainPoint">For Collectors</h2>
          <p className="subPoint2">
            Take your 2D NFT collection into the 3D-Verse. Once connected, claim
            your username and unique website URL that showcases your finest
            collections in 3D 🐒
          </p>
          <p className="subPoint">
            Aside from looking dope AF, adding your unique website URL to your
            Twitter bio shows that your collections are 💯 legit. Here's a fine
            example{' '}
            <a
              style={{ fontStyle: 'italic' }}
              href="https://www.nfz.world/johndoe"
            >
              nfz.world/johndoe
            </a>
          </p>
        </div>
        <div className="PointSeparator">
          <h2 className="mainPoint">For Brands</h2>
          <p className="subPoint2">
            NFZ is the simplest and sexiest way to ape your brand into the
            Metaverse. Sit back and relax while we take care of 3D-Modelling,
            Minting, and Distributing.
          </p>
          <p className="subPoint">
            Icing on the Cake - NFZ guarantees that any items / collections
            launched & signed by our platform will be supported in the future
            open-world metaverse 🎂
          </p>
        </div>

        <div className="PointSeparator" style={{ borderBottom: '0px' }}>
          <div className="centerDiv" style={{ marginTop: '2rem' }}>
            <h2 className="mainPoint" style={{ marginBottom: '3rem' }}>
              🎩 Our Roadmap 🎩
            </h2>
          </div>
          <div className="centerDiv">
            <div className="percentAndDescription">
              <p>10%</p>
              <div style={{ width: '2rem' }}></div>
              <span>Fundraise: First-Edition Founders Merch NFT launch</span>
            </div>
            <div className="percentAndDescription">
              <p>20%</p>
              <div style={{ width: '2rem' }}></div>
              <span>
                We bring in other popular NFTs like CryptoKitty and CryptoPunks
              </span>
            </div>
            <div className="percentAndDescription">
              <p>30%</p>
              <div style={{ width: '2rem' }}></div>
              <span>
                We bring in existing NFTs from big brands like Adidas & Nike
              </span>
            </div>
            <div className="percentAndDescription">
              <p>40%</p>
              <div style={{ width: '2rem' }}></div>
              <span>
                Complete infrastructure for brands to launch their NFT
                collection on NFZ.WORLD
              </span>
            </div>
            <div className="percentAndDescription">
              <p>50%</p>
              <div style={{ width: '2rem' }}></div>
              <span>
                All 3D models by NFZ will be made available for all (Developers
                we got you 😉)
              </span>
            </div>
            <div className="percentAndDescription">
              <p>60%</p>
              <div style={{ width: '2rem' }}></div>

              <span>Fundraise: Second-Edition Founders Merch NFT launch</span>
            </div>
            <div className="percentAndDescription">
              <p>70%</p>
              <div style={{ width: '2rem' }}></div>
              <span>NFZ Token Airdrop for early adopters</span>
            </div>
            <div className="percentAndDescription">
              <p>80%</p>
              <div style={{ width: '2rem' }}></div>
              <span>
                NFZ Dao - token holders vote and decide which Brands / NFTs we
                bring into NFZ.WORLD
              </span>
            </div>
            <div className="percentAndDescription">
              <p>90%</p>
              <div style={{ width: '2rem' }}></div>
              <span>NFZ Marketplace goes live</span>
            </div>
            <div className="percentAndDescription">
              <p>100%</p>
              <div style={{ width: '2rem' }}></div>
              <span>We launch NFZ Wallet for NFTs</span>
            </div>
            <div style={{ marginBottom: '5rem' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
