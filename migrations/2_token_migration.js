const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "MoonDog", "MND");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(30, 20, 23, 27); // Moondog id 0
  await tokenInstance.mint(26, 30, 55, 20); // Moondog id 0
  await tokenInstance.mint(10, 30, 10, 50); // Moondog id 0
  let moonDog = await tokenInstance.getTokenDetails(0);
  console.log(moonDog);
};
