const namingMapping = {
  1: 'avatar', // monkey, human
  2: 'head', // hat, beanie
  3: 'face', // mask, sunglasses
  4: 'body', // shirt, singlet, jacket
  5: 'leftArm', // armband
  6: 'rightArm', // tattoo
  7: 'leftHand', // hand accessories
  8: 'rightHand', // watch
  9: 'legs', // pants, shorts, jeans
  10: 'underwear', // boxers, underwear
  11: 'shoes', // slippers, sandals, feet etc
  12: 'socks',
  13: 'gloves', // gloves, rings, nailpolish
}

export const nameToModelTypeMapping = {
  BoredApeYachtClub: 'avatar',
  MutantApeYachtClub: 'avatar',
  NfzFirstEditionUndies: 'undies',
}

export const modelSelection = (equipedItems) => {
  let hasAvatar = false
  let avatarName = ''
  let undiesName = ''
  for (const item of equipedItems) {
    if (item.modelType === 'avatar') {
      avatarName = item.name
      hasAvatar = true
    }
    if (item.modelType === 'undies') {
      undiesName = item.name
    }
  }
  const models = []
  if (!hasAvatar) {
    models.push('defaultAvatar')
  } else {
    models.push(avatarName)
  }
  if (undiesName) {
    models.push(undiesName)
  }

  return models.join('-') + '.glb'
}

export const equipedMain = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

export const equipedPet = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

export const equipedFurniture = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]
