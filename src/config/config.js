require('dotenv').config();

module.exports = {
  ipfs: {
    apiUrl: process.env.IPFS_API_URL,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  ethereum: {
    privateKey: process.env.ETH_PRIVATE_KEY,
    rpcUrl: process.env.ETH_RPC_URL,
  },
  graph: {
    nodeUrl: process.env.GRAPH_NODE_URL,
  },
};
