import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { type } from "os";
import { nftSol } from "../typechain-types/contracts";
async function deploy(name:string, args:any[]) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(name + " deployed to:", contract.address);
  return contract;
}
type NFTStruct = {
    ctr: string,
    tokenId: number
}
async function addNFT(nftContract:Contract) {
  
    //mint 5 nfts and return an array of NFTStruct with address as ctr and tokenId from 1 to 5
    const nfts = [];
    for (let i = 1; i < 5; i++) {
        console.log("ioiooio")
        await nftContract.mint("https://public.nftstatic.com/static/nft/BSC/BNFTMBOX01/1");
        nfts.push({
            ctr: nftContract.address,
            tokenId: i
        })
    }
    return nfts;
}
async function storeNFTs(nfts: NFTStruct[], signer: any, mycontract: Contract) {
    const signatures = [];
    for (const nft of nfts) {
        const hash = ethers.utils.arrayify(await mycontract.getSignature(nft));
        const signatre = await signer.signMessage(hash);
        await mycontract.storeNFT(nft, signatre)
        console.log(nft.tokenId-1,await mycontract.NFTStored(nft.tokenId-1));
    }
}
async function main() {
//   const signer = (await ethers.getSigners())[0]
//   const nftcontract = await deploy("nft",[])
  
  
//   const nfts = await addNFT(nftcontract);
  let MyContract = await ethers.getContractFactory("MySol");
    let mycontract = await MyContract.attach("0x617b964dfcef78195d895963cf386418658345af")
    console.log(await mycontract.counter(),await mycontract.NFTStored(0))
//     await mycontract.deployed();
//     await storeNFTs(nfts, signer, mycontract);
//     mycontract.deposit(nfts[0], { value: ethers.utils.parseEther("0.1") })
//     console.log(await mycontract.deposits(0))
    // mycontract.on("NFTStoredEvent", (tokenId: number, nft: NFTStruct) => {
    //     console.log("NFTStoredEvent", tokenId, nft);
    // })

//   await storeNFTs(nfts, signer, mycontract);
  

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
