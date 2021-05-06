const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
            }
        ],
        "name": "setNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddressRinkeby = "0x896DA95e07B42002094E0C52c2051b84EF725Fc7";
const contractAddressMumbai = "0x127f01D3Fc55d0c920af783ad1cb2e1016572e8D";

let accounts = [];
let chainId;
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const showChainInfo = document.querySelector('.showChainInfo');
const showMetamaskInstalled = document.querySelector('.showMetamaskInstalled');
const showNumber = document.querySelector('.showNumber');

if (typeof window.ethereum !== 'undefined') {
    showMetamaskInstalled.innerHTML = 'MetaMask is installed!';
}
else {
    showMetamaskInstalled.innerHTML = "Metamask is not installed";
}

ethereumButton.addEventListener('click', () => {
    getAccount();
});

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
}

async function loadContract(contractAddress) {
    return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function loadChainInfo() {
    chainId = await ethereum.request({
        method: 'eth_chainId'
    })

    let chainInfo = "";
    switch (chainId) {
        case "0x4":
            chainInfo = `${chainId} (Ethereum Rinkeby)`;
            break;
        case "0x13881":
            chainInfo = `${chainId} (Matic Mumbai)`;
            break;
        default:
            chainInfo = `${chainId} (This chainId is not intended for this demo)`;
    }

    showChainInfo.innerHTML = chainInfo;
}

async function load() {
    await loadWeb3();
    await loadChainInfo();
    if (chainId === '0x13881') {
        window.contract = await loadContract(contractAddressMumbai);
    }
    else {
        window.contract = await loadContract(contractAddressRinkeby);
    }
}

load();

async function printCoolNumber() {
    const coolNumber = await window.contract.methods.getNumber().call();
    showNumber.innerHTML = coolNumber;
}
async function changeCoolNumber() {
    const value = Math.floor(Math.random() * 100);
    console.log(`Updating coolNumber with ${value}`);
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await window.contract.methods.setNumber(value).send({ from: account });
}

ethereum.on('chainChanged', () => {
    window.location.reload();
});