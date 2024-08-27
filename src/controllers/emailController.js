import fs from 'fs';
import { simpleParser as emailParser } from 'mailparser';
import { uploadFile } from '../services/ipfsService.js';
import { sendCID } from '../services/ethersService.js';
// import { generateProof } from '../services/circomService';

function parseEmailText(text) {
    const amount = text.match(/Total acreditado en tu cuenta: \$ ([0|1|2|3|4|5|6|7|8|9|,]*)/);
    const referenceId = text.match(/Referencia de pago:\n([0|1|2|3|4|5|6|7|8|9|\/|:]*)/);
    let date = text.match(/Fecha:\n([0|1|2|3|4|5|6|7|8|9|\/| |:]*)\n/);
    if (date) {
        const [day, month, year, time] = date[1].split(/[/ ]/);
        const dateFormat = new Date(`${year}-${month}-${day}T${time}`);
        date = dateFormat.getTime()
    }
    return { amount, referenceId, date };
}

function createJSONMetadata(proof, amount, date, referenceId) {
    const images = [
        "Qma4ZNXVfsikh3S1aJtJ8K9BUDLjrpFKR2GwGSc2j18kZU",
        "QmaAJbDv1FEi7rt8yLT51mNzGKF7vZxBEDwBTiZpAHd3Kp",
        "QmamJKzRWpE1uzS3d5BFmPxniYaoaV3KisUBgsApimg7Th",
        "QmRTrGiK7eykmLaynAoZjBvgexga5CBAdhGHAQQ36z6q9Z",
        "QmUDs1mCStach2fwNMea8jqGBFSBeN7jN1BHN6p6W7ThU1"
    ]
    return {
        "image": "ipfs://"+images[(referenceId) % images.length],
        "name": `Contribution #${referenceId} - Independiente`,
        "description": "This is a proof of payment for a contribution to the Independiente crowdfunding campaign.",
        "external_url": "https://github.com/openflow-labs",
        "attributes": 
            [
                {
                    "trait_type": "Proof", 
                    "value": proof
                },
                {
                    "trait_type": "Amount", 
                    "value": amount ? amount[1] : null
                },
                {
                    "display_type": "date", 
                    "trait_type": "Date", 
                    "value": date ? date : null
                },
                {
                    "trait_type": "Reference ID", 
                    "value": referenceId ? referenceId[1] : null
                }
            ]
    };
}

export default async function processEmail(req, res) {
    try {
        const fileBuffer = fs.readFileSync('example.eml');  // req.file.buffer; // Should be .eml
        const parsedEmail = await emailParser(fileBuffer);

        const { text } = parsedEmail;
        const { amount, referenceId, date } = parseEmailText(text);
        
        // const { proof, publicData } = await generateProof(fileBuffer);
        const proof = null
        const proofAndData = createJSONMetadata(proof, amount, date, referenceId);
        const ipfsHash = await uploadFile(JSON.stringify(proofAndData));
        const blockchainTx = await sendCID(ipfsHash);

        res.json({ ipfsHash, proofAndData, blockchainTx });
    } catch (error) {
        console.error('Error processing email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}