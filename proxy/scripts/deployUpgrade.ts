import { ethers, upgrades } from "hardhat";

/**
 * proxy address: 0x0BE843982635e885f35ebfA8EB2422A07fDCC7fE
admin address: 0x96c8Db3AbDCBaC14b062b494cA07393fc0ED3858
implementation address: 0x0F586f212453e8C7e45D46E51158F185f3cB75C8
 */

const proxyAddress = "0x0BE843982635e885f35ebfA8EB2422A07fDCC7fE";

async function main() {
  const V2 = await ethers.getContractFactory("V2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, V2);
  // await proxy.deployed();
  console.log("upgrade number: ", (await upgraded.number()).toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
