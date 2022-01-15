import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useWindowSize } from '../customHooks/useWindowSize'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

const options = ['For Brands', 'For Creators', 'Roadmap']
const ITEM_HEIGHT = 48

export default function Header() {
  const size = useWindowSize()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleOption = (option) => {
    if (option === 'For Brands') {
      navigate('/for-brands')
    } else if (option === 'For Creators') {
      navigate('/for-creators')
    } else if (option === 'Roadmap') {
      navigate('/roadmap')
    }
  }

  return (
    <header>
      <div className="header-inner">
        <div className="header-inner-logo">
          <button className="logo" onClick={() => navigate('/')}>
            WORLD.
          </button>

          {size.width > 740 && (
            <>
              <button
                className="logo-smaller"
                onClick={() => navigate('/for-brands')}
              >
                For Brands
              </button>
              <button
                className="logo-smaller"
                onClick={() => navigate('/for-creators')}
              >
                For Creators
              </button>
            </>
          )}
        </div>
        {size.width > 740 ? (
          <nav>
            <ul>
              <li className="btn">
                <button onClick={() => navigate('/roadmap')}>Roadmap</button>
              </li>
            </ul>
          </nav>
        ) : (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '15ch',
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={() => {
                    handleOption(option)
                    handleClose()
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </div>
    </header>
  )
}
