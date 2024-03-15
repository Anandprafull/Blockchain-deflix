const {ethers} = require('ethers');
const { Network, Alchemy } =require ('alchemy-sdk');

const provider = {
    apiKey: "#######",
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(provider);



const account1 = '0x154dAB87933EbCe02D970ff48161C3604Cd3924c'; // Your account address 1
const account2 = '0x859De8874f25957094e72c23D2dFa9941ca1c131'; // Your account address 2

const privateKey1 = '########'; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1);
    const recieverBalanceBefore = await provider.getBalance(account2);

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()
