require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "AfrikaGirls";
const description = "AfrikaGirls NFT is an exclusive collection of 999 unique art pieces, each representing the rich cultural and ethnic diversities of the Lagos woman of the African continent. Created by Africans for Africans, we're on the journey to revolutionizing the robust web3 ecosystem in the continent and this project is just the first huge step forward.";
const baseUri = "ipfs://bafybeihqyn3ugz5hp76s6ijtkedu2dypzmkucvavpyxseqlbqitlbghid4/"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 999,
    layersOrder: [
      { name: "Background" },
	    { name: "Base" },
      { name: "Birthmark" },      
     	{ name: "Mouth" },
      { name: "Nose" },
      { name: "Nose Stud" },             
      { name: "Eyes" },      
      { name: "Tattoo" },
      { name: "FacePaint" },      
      { name: "Necklace" },
      { name: "Headband" },
      { name: "Sunglasses" },
      { name: "Earrings" },
      { name: "Studs" }, 
      { name: "Badi" },           
      { name: "Cloths" },
      { name: "Strike" },
      { name: "Legacy" },
      { name: "Roken" },       
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 3000,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://afrikagirls.com", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'polygon'; // only rinkeby, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'AfrikaGirls';
const CONTRACT_SYMBOL = 'AG';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xC29F0e2d497DF8996bC63DCc2872FA5391A683db';
const TREASURY_ADDRESS = '0xC29F0e2d497DF8996bC63DCc2872FA5391A683db';
const MAX_SUPPLY = 999; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 10; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = '2022-09-21T14:30:48+00:00'; // This is required. Eg: 2022-09-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = null; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = '1000'; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xC29F0e2d497DF8996bC63DCc2872FA5391A683db"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ['0xC29F0e2d497DF8996bC63DCc2872FA5391A683db']; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0xaD1Eb4815DD9dBEfBD9749c106e6b2a30de04756"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = 'AfrikaGirls'; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "WHICH GIRL WILL BE YOURS?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafkreid43op6xadrsu4uqqczjkykww5ookmzez4wrymvbkxweoz5hhuaum"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://afrikagirls.com",
  creators: [
    {
      address: "0xC29F0e2d497DF8996bC63DCc2872FA5391A683db",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
