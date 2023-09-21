const ethers = require("ethers");
const CONTRACT_ABI = require("./abis/multisig.json");

const CONFIG = {
    ALCHEMY_WEBSOCKET: process.env.ALCHEMY_WEBSOCKET,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    CHANNEL_ID: process.env.CHANNEL_ID,
    SLACK_KEY: process.env.SLACK_KEY,
}


require("dotenv").config();

main();


async function main() {
    const provider = new ethers.providers.WebSocketProvider(
        `wss://eth-mainnet.alchemyapi.io/v2/${CONFIG.ALCHEMY_WEBSOCKET}`
    );
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    contract.on("Transfer", (from, to, value, event) => {
        let info = {
            from,
            to,
            value: ethers.utils.formatUnits(value, 6),
            event,
        };

        postMessage(`
            🚀 A wild transaction appeared!

            👤 From: ${info.from}
            💌 To: ${info.to}
            💰 Value: ${info.value} ETH
            📦 Event data: ${JSON.stringify(info.event)}
            `)
    });
}

async function postMessage(message) {
    try {
        await axios.post('https://slack.com/api/chat.postMessage',
            {
                channel: CONFIG.CHANNEL_ID,
                text: message
            }, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${CONFIG.SLACK_KEY}`
            }
        })
    } catch (error) {
        console.error(error);
    }
}

