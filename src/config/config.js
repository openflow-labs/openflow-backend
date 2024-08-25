require('dotenv').config();

module.exports = config = {
  ipfs: {
    apiUrl: process.env.IPFS_API_URL,
  },
  ethereum: {
    privateKey: process.env.ETH_PRIVATE_KEY,
    rpcUrl: process.env.ETH_RPC_URL,
  },
  graph: {
    nodeUrl: process.env.GRAPH_NODE_URL,
  },
};
