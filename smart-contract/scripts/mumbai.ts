import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { type } from "os";
import { nftSol } from "../typechain-types/contracts";

async function deploy(name: string, args: any[]) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(name + " deployed to:", contract.address);
  return contract;
}
type NFTStruct = {
  ctr: string;
  tokenId: number;
};

async function main() {
    const signer = (await ethers.getSigners())[0]
    const mycontract = await deploy("MySol", [])
    const nft = { ctr: '0x52472DdD1DaAa54c4F942061A52a160b55861396', tokenId: 1 }
    console.log(await mycontract.getSignature(nft));
    const hash = ethers.utils.arrayify(await mycontract.getSignature(nft));
    const signatre = await signer.signMessage(hash);
    await mycontract.storeNFT(nft,signatre);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
