import axios from '../axios'
import { NFTContractsToEnums } from './mappings'
import { nameToModelTypeMapping } from '../profile/utils'

export const getOpenseaNFTs = async (ownerAddress) => {
  const nfts = []
  for (const contractMapping of Object.entries(NFTContractsToEnums)) {
    let contractAddress = contractMapping[0]
    let contractEnum = contractMapping[1]

    const response = await axios.get(
      `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}&asset_contract_address=${contractAddress}`,
    )
    const assets = response.data.assets
    for (const asset of assets) {
      nfts.push({
        name: asset.asset_contract.name,
        symbol: asset.asset_contract.symbol,
        description: asset.asset_contract.description,
        image_original_url: asset.image_original_url,
        image_thumbnail_url: asset.image_thumbnail_url,
        token_id: asset.token_id,
        modelType: nameToModelTypeMapping[asset.asset_contract.name],
      })
    }
  }

  return nfts
}
