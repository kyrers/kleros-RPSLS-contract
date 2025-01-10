import { task } from "hardhat/config";

task("simulatePlayer2Timeout", "Simulate a game where player 2 never plays")
  .addParam("stake", "The stake used upon deployment")
  .setAction(async ({ stake }, { ethers }) => {
    const [player1, player2] = await ethers.getSigners();
    console.log(`## Player 1: ${player1.address}`);
    console.log(`## Player 2: ${player2.address}`);

    const initialBalance1 = await ethers.provider.getBalance(player1.address);
    const initialBalance2 = await ethers.provider.getBalance(player2.address);

    console.log(
      `## Player 1 Initial Balance: ${ethers.formatEther(initialBalance1)} ETH`
    );
    console.log(
      `## Player 2 Initial Balance: ${ethers.formatEther(initialBalance2)} ETH`
    );

    const RPSFactory = await ethers.getContractFactory("RPS");
    const commitmentHash = ethers.solidityPackedKeccak256(
      ["uint8", "uint256"],
      [1, 12345]
    );
    const RPS = await RPSFactory.deploy(commitmentHash, player2.address, {
      value: ethers.parseEther(stake.toString()),
    });
    console.log("## Deployed RPS contract at:", RPS.target);

    const currentStake = await RPS.stake();
    console.log(`## Stake: ${ethers.formatEther(currentStake)} ETH`);

    // Simulate time passing
    console.log(`## Simulating the timeout of 5 minutes passing`);
    await ethers.provider.send("evm_increaseTime", [300]);
    await ethers.provider.send("evm_mine", []);

    await RPS.j2Timeout();
    console.log("## Player 1 called j2Timeout");

    const finalBalance1 = await ethers.provider.getBalance(player1.address);
    const finalBalance2 = await ethers.provider.getBalance(player2.address);

    console.log(
      `## Player 1 Final Balance: ${ethers.formatEther(finalBalance1)} ETH`
    );
    console.log(
      `## Player 2 Final Balance: ${ethers.formatEther(finalBalance2)} ETH`
    );
  });
