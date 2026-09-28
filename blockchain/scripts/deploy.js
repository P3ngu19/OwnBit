import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const OwnBitToken = await ethers.getContractFactory(
    "OwnBitToken"
  );

  const initialSupply = 1000000;

  const token = await OwnBitToken.deploy(initialSupply);

  await token.waitForDeployment();

  console.log(
    "OwnBitToken deployed to:",
    await token.getAddress()
  );

  console.log(
    "Total supply:",
    (await token.totalSupply()).toString()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});