# openflow-backend

[INSERT LOGO]

## API Overview
When a request is made to the /api/email/upload-email endpoint, the emailController:

1. Generates a zero-knowledge proof using the Circom circuit.
2. Uploads the proof and extracted variables as a JSON to IPFS.
3. Posts the IPFS CID to the blockchain.
4. Returns the proof, CID, and blockchain tx hash to the client.


## Example API Call
```bash
curl -X POST http://localhost:3000/api/email/upload-email \
    -H "Content-Type: application/json" \
    -d '{"file": ""}'
```


## File Descriptions
### emailRoutes.js
Purpose: Defines the API endpoints related to email processing.
What it Does:
Maps the /upload-email POST route to the processEmail function in the emailController.
This route is used to handle incoming requests for processing and uploading emails to IPFS, generating proofs, and sending emails.

### ipfsService.js
Purpose: Encapsulates the logic for interacting with IPFS.
What it Does:
Defines a function uploadFile that takes a file buffer, uploads it to IPFS, and returns the resulting IPFS hash (a unique identifier for the stored file).

### emailService.js
Purpose: Handles email-related operations, like sending emails.
What it Does:
Sets up a nodemailer transporter using configuration from .env.
Defines a function sendEmail to send an email with the specified recipient, subject, and content.
src/services/circomService.js
Purpose: Manages the interaction with Circom for generating zero-knowledge proofs.
What it Does:
Defines a function generateProof that takes an input object (in this case, it could be an IPFS hash), runs it through a Circom circuit using SnarkJS, and returns the proof and public signals.

### ethersService.js
Purpose: Manages Ethereum blockchain interactions, such as sending transactions and reading on-chain data.
What it Does:
Initializes an ethers.js provider and wallet using the Ethereum private key and RPC URL from the configuration.
Defines a function sendTransaction to send Ether to a specified address.
Defines a function readOnChainData to interact with smart contracts by calling specific methods.

### graphService.js
Purpose: Provides functionality for querying a Graph node to retrieve indexed blockchain data.
What it Does:
Defines a function queryGraph that sends a GraphQL query to a Graph node and returns the response data.

### emailController.js
Purpose: Acts as the intermediary between the routes and the services. It orchestrates the logic required to process requests.
What it Does:
Defines a function processEmail that:
Receives the file buffer, recipient email, and subject from the request.
Uploads the file to IPFS using ipfsService.
Generates a zero-knowledge proof using circomService.
Sends an email with the IPFS hash and proof using emailService.
Returns a response with the IPFS hash and proof to the client.

### config.js
Purpose: Centralizes configuration settings, particularly those loaded from environment variables.
What it Does:
Loads environment variables using dotenv and exports an object containing configuration details (e.g., IPFS API URL, email SMTP settings, Ethereum RPC URL).

### app.js
Purpose: Sets up and configures the Express application.
What it Does:
Initializes an Express app.
Applies JSON middleware to parse incoming requests.
Configures the application to use the routes defined in emailRoutes.js.

### index.js
Purpose: The main entry point of the application that starts the server.
What it Does:
Imports the Express app from app.js.
Defines the port the application will run on.
Starts the Express server and logs that the server is running.

### circuits/
Purpose: Holds the compiled Circom circuits and related files.
What it Does:
Stores .wasm (compiled Circom circuit) files and .zkey (zero-knowledge key) files needed for proof generation.
This directory is referenced by the circomService when generating proofs.

## How it All Works Together:
