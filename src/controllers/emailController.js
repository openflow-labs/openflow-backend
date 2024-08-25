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
        const amount = text.match(/Total acreditado en tu cuenta: \$ ([0|1|2|3|4|5|6|7|8|9|,]*)/);
        const date = text.match(/Fecha:\n([0|1|2|3|4|5|6|7|8|9|\/| |:]*)\n/);
        const referenceId = text.match(/Referencia de pago:\n([0|1|2|3|4|5|6|7|8|9|\/|:]*)/);
        const publicData = {
            amount: amount ? amount[1] : null,
            date: date ? date[1] : null,
            referenceId: referenceId ? referenceId[1] : null
        }
        
        // const { proof, publicData } = await generateProof(fileBuffer);
        const proofAndData = {
            proof: proof,
            publicSignals: publicData
        };
        const jsonData = JSON.stringify(proofAndData);
        const ipfsHash = await uploadFile(jsonData);

        const blockchainTx = null; //await sendCID(ipfsHash);

        res.json({ ipfsHash, proofAndData, blockchainTx });
    } catch (error) {
        console.error('Error processing email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}