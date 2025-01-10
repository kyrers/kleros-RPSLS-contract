import { task } from "hardhat/config";

task(
  "simulatePlayer1Timeout",
  "Simulate a game where player 1 never solves the game"
)
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

    const RPSPlayer2Instance = RPS.connect(player2);

    await RPSPlayer2Instance.play(2, {
      value: ethers.parseEther(stake.toString()),
    });

    const movePlayed = await RPSPlayer2Instance.c2();
    console.log("## Player 2 played move:", movePlayed.toString());

    // Simulate time passing
    console.log(`## Simulating the timeout of 5 minutes passing`);
    await ethers.provider.send("evm_increaseTime", [300]);
    await ethers.provider.send("evm_mine", []);

    await RPSPlayer2Instance.j1Timeout();
    console.log("## Player 2 called j1Timeout");

    const finalBalance1 = await ethers.provider.getBalance(player1.address);
    const finalBalance2 = await ethers.provider.getBalance(player2.address);

    console.log(
      `## Player 1 Final Balance: ${ethers.formatEther(finalBalance1)} ETH`
    );
    console.log(
      `## Player 2 Final Balance: ${ethers.formatEther(finalBalance2)} ETH`
    );
  });
