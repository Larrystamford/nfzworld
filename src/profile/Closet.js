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
import {
  equipedMain,
  equipedPet,
  equipedFurniture,
  modelSelection,
} from './utils'
import { ConstructionOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useDidMountEffect } from '../customHooks/useDidMountEffect'

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

export const Closet = ({
  username,
  openCloset,
  setOpenCloset,
  handleOpenCloset,
  handleCloseCloset,
  iconSelection,
  setIconSelection,
  featuredNfts,
  nftIcons,
  itemSelection,
  setItemSelection,
  userObj,
  setModelChoice,
}) => {
  const [equip, setEquip] = useState([])
  const [equiped, setEquiped] = useState([]) // list of {} equipment
  const handleEquipping = async (equippingNft, save) => {
    if (equippingNft.modelType) {
      // remove the previous equiped item
      let token_id_to_remove = ''
      let name_to_remove = ''
      for (let i = 0; i < equiped.length; i++) {
        if (equiped[i].modelType === equippingNft.modelType) {
          token_id_to_remove = equiped[i].token_id
          name_to_remove = equiped[i].name
          equiped.splice(i, 1)
        }
      }
      if (token_id_to_remove && name_to_remove) {
        for (let i = 0; i < nftIcons.length; i++) {
          if (
            nftIcons[i].token_id === token_id_to_remove &&
            nftIcons[i].name === name_to_remove
          ) {
            equipedMain[i + 5] = 0
          }
        }
      }
      setEquip(equipedMain)
      // remove the previous equiped item

      const newEquip = [...equiped, equippingNft]

      if (save) {
        // remove featured items
        for (let i = 0; i < newEquip.length; i++) {
          if (newEquip[i].currentStatus === 'featured') {
            newEquip.splice(i, 1)
          }
        }

        await axios.post('/v1/users/update', {
          docId: userObj.id,
          newDataObject: {
            equiped: newEquip,
          },
        })
      }
      setItemSelection(null)
      setEquiped(newEquip)
      const modelSelected = modelSelection(newEquip)
      setModelChoice(modelSelected)
    }
  }

  useDidMountEffect(() => {
    if (userObj) {
      setEquiped(userObj.equiped)
      for (let i = 0; i < nftIcons.length; i++) {
        for (const equipedItem of userObj.equiped) {
          if (equipedItem.token_id === nftIcons[i].token_id) {
            equipedMain[i + 5] = 1
          }
        }
      }
      setEquip(equipedMain)
    }
  }, [userObj, nftIcons])

  useEffect(() => {
    if (iconSelection === 'star') {
      setEquip(equipedMain)
    } else if (iconSelection === 'pet') {
      setEquip(equipedPet)
    } else if (iconSelection === 'furniture') {
      setEquip(equipedFurniture)
    }
  }, [iconSelection])

  const navigate = useNavigate()
  const itemRows = [1, 2, 3, 4, 5, 6]
  const handleItemSelection = (itemNum) => {
    if (itemNum === itemSelection) {
      setItemSelection(null)
    } else {
      setItemSelection(itemNum)
    }
  }

  const selectionColor = 'lightgrey'
  const equippedColor = 'gold'

  const handleShowNftIcon = (itemIndex) => {
    let itemRealIndex = itemIndex - 5
    if (nftIcons.length >= itemRealIndex + 1) {
      return (
        <img
          className="NftIcon"
          src={nftIcons[itemRealIndex].image_thumbnail_url}
        />
      )
    } else {
      return <></>
    }
  }

  const handleShowFeaturedNft = (itemIndex) => {
    if (featuredNfts.length >= itemIndex + 1) {
      return (
        <img
          className="NftIcon"
          src={featuredNfts[itemIndex].image_thumbnail_url}
        />
      )
    } else {
      return <></>
    }
  }

  const handleElipsis = (sentence) => {
    if (sentence && sentence.length > 100) {
      return sentence.slice(0, 100) + ' ...'
    }
    return sentence
  }

  return (
    <Dialog
      open={openCloset}
      onClose={handleCloseCloset}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: 'rgb(0,0,0,0.6)',
          width: '19rem',
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
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          nfz.world
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="ItemContainer">
            <div className="SpecialItemRow" style={{ marginBottom: '1rem' }}>
              <div
                className="SpecialItemBox"
                style={
                  itemSelection === 0
                    ? { border: `2px solid ${selectionColor}` }
                    : equip[0]
                    ? { border: `2px solid ${equippedColor}` }
                    : {}
                }
                onClick={() => handleItemSelection(0)}
              >
                {handleShowFeaturedNft(0)}
              </div>
              <div
                className="SpecialItemBox"
                style={
                  itemSelection === 1
                    ? { border: `2px solid ${selectionColor}` }
                    : equip[1]
                    ? { border: `2px solid ${equippedColor}` }
                    : {}
                }
                onClick={() => handleItemSelection(1)}
              >
                {handleShowFeaturedNft(1)}
              </div>
              <div
                className="SpecialItemBox"
                style={
                  itemSelection === 2
                    ? { border: `2px solid ${selectionColor}` }
                    : equip[2]
                    ? { border: `2px solid ${equippedColor}` }
                    : {}
                }
                onClick={() => handleItemSelection(2)}
              >
                {handleShowFeaturedNft(2)}
              </div>
              <div
                className="SpecialItemBox"
                style={
                  itemSelection === 3
                    ? { border: `2px solid ${selectionColor}` }
                    : equip[3]
                    ? { border: `2px solid ${equippedColor}` }
                    : {}
                }
                onClick={() => handleItemSelection(3)}
              >
                {handleShowFeaturedNft(3)}
              </div>
              <div
                className="SpecialItemBox"
                style={
                  itemSelection === 4
                    ? { border: `2px solid ${selectionColor}` }
                    : equip[4]
                    ? { border: `2px solid ${equippedColor}` }
                    : {}
                }
                onClick={() => handleItemSelection(4)}
              >
                {handleShowFeaturedNft(4)}
              </div>
            </div>

            <div className="ScollableItemsContainer">
              {itemRows.map((option, i) => (
                <div className="ItemRow">
                  <div
                    className="ItemBox"
                    style={
                      itemSelection === (i + 1) * 5
                        ? { border: `2px solid ${selectionColor}` }
                        : equip[(i + 1) * 5]
                        ? { border: `2px solid ${equippedColor}` }
                        : {}
                    }
                    onClick={() => handleItemSelection((i + 1) * 5)}
                  >
                    {handleShowNftIcon((i + 1) * 5)}
                  </div>
                  <div
                    className="ItemBox"
                    style={
                      itemSelection === (i + 1) * 5 + 1
                        ? { border: `2px solid ${selectionColor}` }
                        : equip[(i + 1) * 5 + 1]
                        ? { border: `2px solid ${equippedColor}` }
                        : {}
                    }
                    onClick={() => handleItemSelection((i + 1) * 5 + 1)}
                  >
                    {handleShowNftIcon((i + 1) * 5 + 1)}
                  </div>
                  <div
                    className="ItemBox"
                    style={
                      itemSelection === (i + 1) * 5 + 2
                        ? { border: `2px solid ${selectionColor}` }
                        : equip[(i + 1) * 5 + 2]
                        ? { border: `2px solid ${equippedColor}` }
                        : {}
                    }
                    onClick={() => handleItemSelection((i + 1) * 5 + 2)}
                  >
                    {handleShowNftIcon((i + 1) * 5 + 2)}
                  </div>
                  <div
                    className="ItemBox"
                    style={
                      itemSelection === (i + 1) * 5 + 3
                        ? { border: `2px solid ${selectionColor}` }
                        : equip[(i + 1) * 5 + 3]
                        ? { border: `2px solid ${equippedColor}` }
                        : {}
                    }
                    onClick={() => handleItemSelection((i + 1) * 5 + 3)}
                  >
                    {handleShowNftIcon((i + 1) * 5 + 3)}
                  </div>
                  <div
                    className="ItemBox"
                    style={
                      itemSelection === (i + 1) * 5 + 4
                        ? { border: `2px solid ${selectionColor}` }
                        : equip[(i + 1) * 5 + 4]
                        ? { border: `2px solid ${equippedColor}` }
                        : {}
                    }
                    onClick={() => handleItemSelection((i + 1) * 5 + 4)}
                  >
                    {handleShowNftIcon((i + 1) * 5 + 4)}
                  </div>
                </div>
              ))}
            </div>

            <div className="ItemRow" style={{ marginTop: '0.5rem' }}>
              <StarIcon
                style={
                  iconSelection === 'star'
                    ? { fontSize: '30px' }
                    : { fontSize: '30px', color: `grey` }
                }
                onClick={() => setIconSelection('star')}
              />
              <PetsIcon
                style={
                  iconSelection === 'pet'
                    ? { fontSize: '25px' }
                    : { fontSize: '25px', color: `grey` }
                }
                onClick={() => setIconSelection('pet')}
              />
              <TableRestaurantIcon
                style={
                  iconSelection === 'furniture'
                    ? { fontSize: '26px' }
                    : { fontSize: '26px', color: `grey` }
                }
                onClick={() => setIconSelection('furniture')}
              />
            </div>

            {itemSelection < 5 &&
            itemSelection !== null &&
            featuredNfts.length > itemSelection ? (
              <div className="FeaturedNftContainer">
                <CloseOutlinedIcon
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1001,
                    color: 'grey',
                  }}
                  onClick={() => setItemSelection(null)}
                />
                <div className="header">featured</div>
                <div className="image-description-container">
                  <img
                    className="image"
                    src={featuredNfts[itemSelection].image_thumbnail_url}
                    onClick={() => {
                      navigate(
                        `/launchpad/${featuredNfts[itemSelection].name}`,
                        { state: featuredNfts[itemSelection] },
                      )
                    }}
                  />
                  <div
                    className="description"
                    onClick={() => {
                      navigate(
                        `/launchpad/${featuredNfts[itemSelection].name}`,
                        { state: featuredNfts[itemSelection] },
                      )
                    }}
                  >
                    <div className="title">
                      {featuredNfts[itemSelection].symbol}
                    </div>
                  </div>
                </div>
                <div
                  className="details-container"
                  onClick={() => {
                    navigate(`/launchpad/${featuredNfts[itemSelection].name}`, {
                      state: featuredNfts[itemSelection],
                    })
                  }}
                >
                  {handleElipsis(featuredNfts[itemSelection].description)}
                </div>
                <button
                  className="action-button"
                  onClick={() => {
                    navigate(`/launchpad/${featuredNfts[itemSelection].name}`, {
                      state: featuredNfts[itemSelection],
                    })
                  }}
                >
                  Learn More
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    handleEquipping(featuredNfts[itemSelection], false)
                  }}
                  style={{
                    color: 'gold',
                    marginTop: '3px',
                    marginBottom: '10px',
                  }}
                >
                  Try It Out
                </button>
              </div>
            ) : (
              <></>
            )}

            {itemSelection >= 5 &&
            itemSelection !== null &&
            nftIcons.length + 5 > itemSelection ? (
              <div className="FeaturedNftContainer">
                <CloseOutlinedIcon
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1001,
                    color: 'grey',
                  }}
                  onClick={() => setItemSelection(null)}
                />
                <div className="header" style={{ color: 'white' }}>
                  item
                </div>
                <div className="image-description-container">
                  <img
                    className="image"
                    src={nftIcons[itemSelection - 5].image_thumbnail_url}
                  />
                  <div className="description">
                    <div
                      className="title"
                      style={{ color: 'lightgrey', fontWeight: 'bold' }}
                    >
                      {nftIcons[itemSelection - 5].symbol +
                        ' #' +
                        nftIcons[itemSelection - 5].token_id}
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  {handleElipsis(nftIcons[itemSelection - 5].description)}
                </div>
                {equip[itemSelection] ? (
                  <button className="action-button" style={{ color: 'grey' }}>
                    Equipped
                  </button>
                ) : (
                  <button
                    className="action-button"
                    style={{ color: 'lightgrey' }}
                    onClick={() => {
                      equip[itemSelection] = 1
                      handleEquipping(nftIcons[itemSelection - 5], true)
                      handleItemSelection(itemSelection)
                    }}
                  >
                    Equip
                  </button>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
