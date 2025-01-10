# kleros-RPSLS-contract

This project contains the contract for the Kleros Rock-Paper-Scissor-Lizard-Spock test exercise.
It also contains some tasks so one can interact with instances of the contract to explore how it works.

### Project setup

First, install the dependencies.

```sh 
npm install
```

Then compile the contract and generate types:
```sh 
npx hardhat compile
```

### Running tasks

Three tasks have been implemented:

1. `simulateGame`: Allows users to simulate a game being played. To use it, run:

```sh 
npx hardhat simulateGame --salt 12345 --move1 1 --move2 3 --stake 5
```
2. `simulatePlayer1Timeout`: Allows users to simulate a situation where player 1 doesn't solve the game before the timeout. To use it, run:

```sh 
npx hardhat simulatePlayer1Timeout --stake 5
```
3. `simulatePlayer2Timeout`: Allows users to simulate a situation where player 2 fails to select the move before the timeout. To use it, run:

```sh 
npx hardhat simulatePlayer2Timeout --stake 5
```
