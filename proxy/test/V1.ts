import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("proxy", function () {
    it('works', async () => {
        const V1 = await ethers.getContractFactory("V1");
        const V2 = await ethers.getContractFactory("V2");

        const instance = await upgrades.deployProxy(V1, [23]);

        const version1 = await instance.VERSION();
        console.log('version1=', version1)
        expect(version1).to.equal('1');
        
        const upgraded = await upgrades.upgradeProxy(instance.address, V2);

        await upgraded.setNumber('7');

        const value = await upgraded.number();
        console.log('value=', value)
        expect(value).to.equal('30');

        const version2 = await upgraded.VERSION();
        console.log('version2=', version2)
        expect(version2).to.equal('2');

    })

})