// ------ OpenSea general properties ------
// attribute item
interface OpenSeaAttrItem {
  trait_type: string
}
interface NamedItem {
  name: string
}
// property object
interface OpenSeaStringProperty {
  value: string
  display_value: string
}
interface OpenSeaNumberProperty {
  value: number
  display_type?: 'number' | 'boost_percentage' | 'boost_number'
}
interface OpeanSeaDateProperty {
  value: number
  display_type?: 'date'
}
type OpenSeaProperty = OpenSeaStringProperty | OpenSeaNumberProperty | OpeanSeaDateProperty

// metadata basics
export interface OpenSeaNFTMetadataBasics {
  /** nft name */
  name: string
  /** nft description */
  description: string/**  */
  /** nft preview url field */
  image?: string
  /** opeasea external url field */
  external_url?: string
  /** opeasea animation url field */
  animation_url?: string
}

// ------ Mintcraft Asset metadta ------
export const SUPPORTED_ASSETS = {
  FBX: 'fbx',
  OBJ: 'obj'
}

export interface MintcraftAssetMeta {
  /** content url field */
  content: string
  /** content type */
  content_type: 'fbx' | 'obj'
}

export interface MintcraftAssetProperty {
  mintcraft?: MintcraftAssetMeta
}

// ------ NFT metadata schema ------
export interface NFTMetadata extends OpenSeaNFTMetadataBasics {
  /** erc1155 nft properties */
  properties?: Record<string, string> & Record<string, OpenSeaProperty & NamedItem> & MintcraftAssetProperty
  /** opeasea attributes */
  attributes?: Array<OpenSeaAttrItem & OpenSeaProperty>
}
