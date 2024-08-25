const { uploadFile } = require('../services/ipfsService');
const { generateProof } = require('../services/circomService');

async function processEmail(req, res) {
  const { fileBuffer, recipient, subject } = req.body;

  try {
    const ipfsHash = await uploadFile(fileBuffer);
    const proof = await generateProof({ hash: ipfsHash });
    
    res.json({ success: true, ipfsHash, proof });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { processEmail };
