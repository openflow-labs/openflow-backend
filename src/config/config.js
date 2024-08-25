import dotenv from 'dotenv'; 

dotenv.config();

const config = {
  ipfs: {
    apiUrl: process.env.IPFS_URL
  },
  ethereum: {
    contractAddress: "0xA5B1d13395A130C24a2625CFbCbBFA9a482eE393",  // zkSync
    // contractAddress: "0xc2190225340fF87588785D451bba2304384Ae488", // Polygon
    // contractAddress: "0x9433c1Ec92889237f923ac77471Aa84bF3ee06aB",  // Fuji
    // contractAddress: "0xe303C6a9AF99155443D9A00a583169A1D6ea7f42",
    // contractAddress: "0x70063e13127e2741c1084fc65cd77d16e28886fd",
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
    // contractFunction: "mintBatch(string[])",
    // contractAbi: [
    //   {
    //     "inputs": [
    //       {
    //         "internalType": "string[]",
    //         "name": "cid",
    //         "type": "string[]"
    //       }
    //     ],
    //     "name": "mintBatch",
    //     "outputs": [],
    //     "stateMutability": "nonpayable",
    //     "type": "function"
    //   }
    // ],
    privateKey: process.env.ETH_PRIVATE_KEY,
    // rpcUrl: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
    // rpcUrl: "https://polygon-amoy.drpc.org",
    rpcUrl: "https://sepolia.era.zksync.dev"
  },
};

export default config;