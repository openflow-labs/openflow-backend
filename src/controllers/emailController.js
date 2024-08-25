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

        const proof = null
        const { text } = parsedEmail;
        const amount = text.match(/Total acreditado en tu cuenta: \$ ([0|1|2|3|4|5|6|7|8|9|,]*)/);
        const referenceId = text.match(/Referencia de pago:\n([0|1|2|3|4|5|6|7|8|9|\/|:]*)/);
        let date = text.match(/Fecha:\n([0|1|2|3|4|5|6|7|8|9|\/| |:]*)\n/);
        if (date) {
            const [day, month, year, time] = date[1].split(/[/ ]/);
            const dateFormat = new Date(`${year}-${month}-${day}T${time}`);
            date = dateFormat.getTime()
        }
        
        // const { proof, publicData } = await generateProof(fileBuffer);
        const proofAndData = {
            "image": "https://www.hospitalitalianorosario.com.ar/images/abt_img.jpg",
            "name": "Proof of Payment Test #1",
            "description": "Showing the proof of payment for a test",
            "external_url": "https://www.instagram.com/santimaratea",
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

        const ipfsHash = await uploadFile(JSON.stringify(proofAndData));

        const blockchainTx = await sendCID(ipfsHash);

        res.json({ ipfsHash, proofAndData, blockchainTx });
    } catch (error) {
        console.error('Error processing email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}