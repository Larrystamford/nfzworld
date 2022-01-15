import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './customHooks/useMetaMask'

function getLibrary(provider, connector) {
  return new Web3(provider)
}

ReactDOM.render(
<React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
