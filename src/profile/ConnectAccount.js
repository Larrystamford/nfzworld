import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import StarIcon from '@mui/icons-material/Star'
import PetsIcon from '@mui/icons-material/Pets'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import { equiped } from './utils'
import { ConstructionOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import ChooseWallet from '../components/wallet/ChooseWallet'
import useMetaMask from '../customHooks/useMetaMask'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

export const ConnectAccount = ({
  openAccount,
  setOpenAccount,
  handleOpenAccount,
  handleCloseAccount,
}) => {
  const {
    connect,
    disconnect,
    isActive,
    account,
    shouldDisable,
  } = useMetaMask()

  const [noUsername, setNoUsername] = useState(false)

  return (
    <Dialog
      open={openAccount}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: 'rgb(250,250,250,0.90)',
          width: '30rem',
        },
      }}
    >
      <DialogTitle
        style={{ cursor: 'move' }}
        id="draggable-dialog-title"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            width: '100%',
            height: '2rem',
            borderBottom: '1px solid grey',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontStyle: 'italic',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'grey',
          }}
        >
          {noUsername ? <>New Account</> : <>Connect Wallet</>}
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <ChooseWallet
            handleCloseAccount={handleCloseAccount}
            noUsername={noUsername}
            setNoUsername={setNoUsername}
          />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
