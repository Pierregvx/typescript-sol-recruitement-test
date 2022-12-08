import { ethers, network } from "hardhat";
async function deploy(name:string, args:any[]) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(name + " deployed to:", contract.address);
  return contract;
}
async function deployNFT() {
  const nft = await deploy("nft", []);
  await nft.mint("test");
  return {
    "ctr":nft.address,
    "tokenId":1
  }
}
async function main() {
  const signer = (await ethers.getSigners())[0]
  console.log(signer.address,await signer.getBalance())
  const nft = await deployNFT();
  let mycontract = await deploy("MySol", []);
  
  const hash = ethers.utils.arrayify(await mycontract.getSignature(nft));
  const signatre = await signer.signMessage(hash);console.log("address nft", nft.ctr);
  await mycontract.storeNFT(nft, signatre);
  console.log(await mycontract.NFTStored(0));
  
  mycontract.on("NFTStoredEvent", async (nft,add1,add2) => {
    console.log("NFTStoredEvent", nft,add1,add2);
    console.log(await mycontract.counter())
    console.log(await mycontract.NFTStored(0));
})

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
