import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { V2__factory } from "../typechain-types";

task("getNumber").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new V2__factory(dev).attach(
    addressList[network.name].Proxy
  );
  const numer = await myContract.number();
  console.log("numer: ", numer.toString());
});

// yarn hardhat getVersion --network bnbtest
task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new V2__factory(dev).attach(
    addressList[network.name].Proxy
  );
  const version = await myContract.VERSION();
  console.log("version: ", version.toString());
});

task("setNumber")
  .addParam("number", "The number to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new V2__factory(dev).attach(
      addressList[network.name].Proxy
    );
    const tx = await myContract.setNumber(taskArgs.number);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.number();
    console.log("currentNumer: ", currentValue.toString());
  });