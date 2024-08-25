const axios = require('axios');
const config = require('../config/config');

async function queryGraph(query) {
  const response = await axios.post(config.graph.nodeUrl, {
    query,
  });
  return response.data;
}

module.exports = { queryGraph };
