# MultiSig Notifier

This Node.js script monitors a MultiSig contract on the Ethereum Mainnet using Alchemy WebSocket, and notifies about transfers via Slack.

## Prerequisites

- Node.js environment
- Ethereum Wallet with Alchemy WebSocket enabled
- Ethereum MultiSig Contract ABI (from multisig.json)

## Configuration

The script relies on environment variables for configuration:

- `ALCHEMY_WEBSOCKET`: Alchemy WebSocket URL
- `CONTRACT_ADDRESS`: Ethereum MultiSig contract address
- `CHANNEL_ID`: Slack channel ID
- `SLACK_KEY`: Slack API key

## Running the Script

1. Clone the repository and install dependencies using `npm install`.
2. Set up the environment variables or configure them directly in the script.
3. Run the script using `node app.js`.

## Explanation

1. It establishes a WebSocket connection to Alchemy using the provided ALCHEMY_WEBSOCKET.
2. Sets up an event listener for the "Transfer" event from the Ethereum MultiSig contract.
3. When a transfer event occurs, it formats the information and posts a notification to the specified Slack channel using Slack API.
