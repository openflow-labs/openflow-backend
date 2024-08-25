import dotenv from 'dotenv'; 

dotenv.config();

const config = {
  ipfs: {
    apiUrl: process.env.IPFS_URL
  },
  ethereum: {
    privateKey: process.env.ETH_PRIVATE_KEY,
    rpcUrl: process.env.ETH_RPC_URL,
  },
};

export default config;