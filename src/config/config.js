import dotenv from 'dotenv'; 

dotenv.config();

const config = {
  ipfs: {
    apiUrl: process.env.IPFS_URL
  },
  ethereum: {
    contractAddress: "0xe303C6a9AF99155443D9A00a583169A1D6ea7f42",
    contractFunction: "mint(string)",
    contractAbi: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "cid",
            "type": "string"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    privateKey: process.env.ETH_PRIVATE_KEY,
    rpcUrl: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
  },
};

export default config;