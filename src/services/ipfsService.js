import { ipfs as _ipfs } from '../config/config'

async function uploadFile(fileBuffer) {
	const { create } = await import('ipfs-http-client')
	const ipfs = create({ url: _ipfs.apiUrl })

	const { path } = await ipfs.add(fileBuffer)
	return path
}

export default { uploadFile }
