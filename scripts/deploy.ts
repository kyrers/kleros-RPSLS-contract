import hre, { ethers } from "hardhat";
import RPSModule from "../ignition/modules/RPS";

async function main() {
  const [_, player2] = await ethers.getSigners();
  console.log("## PLAYER 2:", player2.address);

  const { RPS } = await hre.ignition.deploy(RPSModule, {
    parameters: {
      RPSModule: { player2Address: player2.address },
    },
  });

  console.log("## RPS deployed to:", RPS.target.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
