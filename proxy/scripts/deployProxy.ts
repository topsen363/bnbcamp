import { ethers, upgrades } from "hardhat";

async function main() {
  const V1 = await ethers.getContractFactory("V1");
  const proxy = await upgrades.deployProxy(V1, [23]);
  await proxy.deployed();
  console.log("proxy address:", proxy.address);

  const admin = await upgrades.erc1967.getAdminAddress(proxy.address);

  console.log("admin address:", admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(proxy.address);

  console.log("implementation address:", implementation)


  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
