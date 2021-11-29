const Marketplace = artifacts.require("Marketplace");

module.exports = async function (deployer) {
  await deployer.deploy(Marketplace, "0xf04491d08462a69aa92Ef7Bd3b7c2C72c1Edd27b");
  let tokenInstance = await Marketplace.deployed();
};
