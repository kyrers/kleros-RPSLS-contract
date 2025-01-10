import { task } from "hardhat/config";

task("simulateGame", "Simulate an RPS game")
  .addParam("salt", "The salt to use")
  .addParam("move1", "Player 1 move")
  .addParam("move2", "Player 2 move")
  .addParam("stake", "The stake")
  .setAction(async ({ salt, move1, move2, stake }, { ethers }) => {
    const [player1, player2] = await ethers.getSigners();
    console.log(`## Player 1: ${player1.address}`);
    console.log(`## Player 2: ${player2.address}`);

    const intialBalance1 = await ethers.provider.getBalance(player1.address);
    const intialBalance2 = await ethers.provider.getBalance(player2.address);

    console.log(
      `## Player 1 Initial Balance: ${ethers.formatEther(intialBalance1)} ETH`
    );
    console.log(
      `## Player 2 Initial Balance: ${ethers.formatEther(intialBalance2)} ETH`
    );

    // Deploy the contract
    const RPSFactory = await ethers.getContractFactory("RPS");
    const commitmentHash = ethers.solidityPackedKeccak256(
      ["uint8", "uint256"],
      [move1, salt]
    );

    const RPS = await RPSFactory.deploy(commitmentHash, player2.address, {
      value: ethers.parseEther(stake.toString()),
    });
    console.log("## Deployed RPS contract at:", RPS.target);

    const currentStake = await RPS.stake();
    console.log(`## Stake: ${ethers.formatEther(currentStake)} ETH`);

    const player2Plays = await RPS.connect(player2).play(move2, {
      value: ethers.parseEther(stake.toString()),
    });
    console.log("## Player 2 plays:", player2Plays);

    const movePlayed = await RPS.c2();
    console.log("## Player 2 played move:", movePlayed.toString());

    const player1Solves = await RPS.solve(move1, salt);
    console.log("## Player 1 solves the game:", player1Solves);

    const finalBalance1 = await ethers.provider.getBalance(player1.address);
    const finalBalance2 = await ethers.provider.getBalance(player2.address);

    console.log(
      `## Player 1 Balance: ${ethers.formatEther(finalBalance1)} ETH`
    );
    console.log(
      `## Player 2 Balance: ${ethers.formatEther(finalBalance2)} ETH`
    );
  });
