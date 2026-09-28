import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const contractAddress =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const OwnBitToken = await ethers.getContractFactory(
    "OwnBitToken"
  );

  const token = OwnBitToken.attach(contractAddress);

  const [deployer] = await ethers.getSigners();

  const balance = await token.balanceOf(deployer.address);
  const totalSupply = await token.totalSupply();

  console.log("Deployer:", deployer.address);
  console.log("Token balance:", balance.toString());
  console.log("Total supply:", totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});