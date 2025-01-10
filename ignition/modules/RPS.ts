import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const SALT = 12345;
const MOVE = 1;
const STAKE = ethers.parseEther("5");

const RPSModule = buildModule("RPSModule", (m) => {
  const player2Address = m.getParameter("player2Address");

  // Generate the commitment hash.
  const commitmentHash = ethers.solidityPackedKeccak256(
    ["uint8", "uint256"],
    [MOVE, SALT]
  );

  console.log("## Commitment hash:", commitmentHash);

  const RPS = m.contract("RPS", [commitmentHash, player2Address], {
    value: STAKE,
  });

  return { RPS };
});

export default RPSModule;
