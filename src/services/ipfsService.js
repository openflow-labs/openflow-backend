import lighthouse from '@lighthouse-web3/sdk'
import dotenv from 'dotenv'

dotenv.config()

// Receives json as JSON
// Returns cid as string
async function uploadFile(json) {
	const response = await lighthouse.uploadText(
		json,
		process.env.LIGHTHOUSE_API,
		'metadata.json'
	)

	const cid = response.data.Hash

	console.log(`Uploaded metadata to IPFS with CID: ${cid}`)

	return cid
}

export default { uploadFile }