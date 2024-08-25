import fs from 'fs';
import { simpleParser as emailParser } from 'mailparser';
import { uploadFile } from '../services/ipfsService.js';
import { sendCID } from '../services/ethersService.js';
// import { generateProof } from '../services/circomService';

export default async function processEmail(req, res) {
    try {
        // const fileBuffer = req.file.buffer; // .eml file buffer
        const fileBuffer = fs.readFileSync('example.eml');
        const parsedEmail = await emailParser(fileBuffer);

        // Parse the .eml file
        const proof = null
        const { text } = parsedEmail;
        const amount = text.match(/Amount: (\d+)/);
        const date = text.match(/Date: (\d+)/);
        const referenceId = text.match(/Reference ID: (\d+)/);
        const publicData = {
            amount: amount ? amount : null,
            date: date ? date : null,
            referenceId: referenceId ? referenceId : null
        }
        
        // const { proof, publicData } = await generateProof(fileBuffer);
        const proofAndData = {
            proof: proof,
            publicSignals: publicData
        };
        const jsonData = JSON.stringify(proofAndData);
        const ipfsHash = await uploadFile(jsonData);

        const blockchainTx = await sendCID(ipfsHash);

        res.json({ ipfsHash, proofAndData, blockchainTx });
    } catch (error) {
        console.error('Error processing email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}