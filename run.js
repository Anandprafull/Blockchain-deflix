import { ethers } from "ethers";
import { contractABI } from "./abi/contractABI.js";
import "dotenv/config";

const getProviders = () => {
    return new ethers.providers.AlchemyProvider(
      "maticmum",
      process.env.ALCHEMY_API_KEY
    );
  };
  
  const getSigner = () => {
    let provider = getProviders();
    return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  };
  
  const deflixInstance = async () => {
    const signer = getSigner();
    const contract = new ethers.Contract(
      process.env.DEFLIX_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    return contract;
  };

  export const mintMovies = async (quantity) => {
    const wallet = getSigner();
    const contract = await deflixInstance();
    const unsignedTx = await contract.populateTransaction.mintMovies(quantity);
    let signedTx = await wallet.sendTransaction(unsignedTx);
    let receipt = await signedTx.wait();
  
    // Get the token IDs from the Transfer events
    const tokenIds = receipt.events
      .filter((event) => event.event === "Transfer")
      .map((event) => event.args.tokenId);
  
    return tokenIds;
  };
  
  export const uploadReview = async (tokenId, uri) => {
    const wallet = getSigner();
    const contract = await deflixInstance();
    const unsignedTx = await contract.populateTransaction.uploadReview(tokenId, uri);
    let signedTx = await wallet.sendTransaction(unsignedTx);
    let receipt = await signedTx.wait();
    return receipt;
  };
  
  export const getReview = async (tokenId) => {
    const contract = await deflixInstance();
    const review = await contract.getReview(tokenId);
    return review;
  };
  
  // Example usage
  (async () => {
    const quantity = 5;
    const tokenIds = await mintMovies(quantity);
    console.log(`Minted ${quantity} movies with token IDs: ${tokenIds}`);
  
    // const tokenId = tokenIds[0]; // Use the first token ID for example
    // const uri = "ipfs://example-review";
    // await uploadReview(tokenId, uri);
    // console.log(`Uploaded review for token ID ${tokenId}: ${uri}`);
  
    // const review = await getReview(tokenId);
    // console.log(`Review for token ID ${tokenId}: ${review}`);
  })();

// // Bulk mint tokens
// const mintQuantity = 5; // Number of tokens to mint
// const tx = await contract.mintMovies(mintQuantity);
// await tx.wait();

// // Get the token IDs of the minted tokens
// const startTokenId = await contract._startTokenId();
// const tokenIds = Array.from({ length: mintQuantity }, (_, i) => startTokenId.toNumber() + i);

// console.log("Minted Token IDs:", tokenIds);

// (async() => {
//     const receipt= await getReview(3)
//     console.log(receipt);
//   })()
  
  



// // // Replace with your contract address and ABI
// // const contractAddress = "0x285a30830de6f82429a1a0abd2c26f55a677975b";

// // // Connect to the Ethereum network (replace with your provider)
// // const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID");

// // // Create a signer (replace with your private key or use a wallet provider like MetaMask)
// // const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

// // // Create a contract instance
// // const contract = new ethers.Contract(contractAddress, contractABI, signer);