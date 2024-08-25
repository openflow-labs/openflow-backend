import config from '../config/config.js';

async function uploadFile(fileBuffer) {
    const { create } = await import('ipfs-http-client');
    const ipfs = create({ url: config.ipfs.apiUrl });
  
    const { path } = await ipfs.add(fileBuffer);
    return path;
  }
  
  export default { uploadFile };
  