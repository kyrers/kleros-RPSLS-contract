import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/simulateGame";
import "./tasks/simulatePlayer1Timeout";
import "./tasks/simulatePlayer2Timeout";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
      },
      {
        version: "0.4.26",
      },
    ],
  },
};

export default config;
