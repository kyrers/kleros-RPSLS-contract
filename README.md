# kleros-RPSLS-contract

This project contains the contract for the Kleros Rock-Paper-Scissor-Lizard-Spock test exercise.
It also contains some tasks so one can interact with instances of the contract to explore how it works.
Finally, an ignition module was created to deploy the `Hasher` contract to be used in the frontend;

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

### Deploying the Hasher contract locally

Run the deploy module like:

```sh
npx hardhat ignition deploy ignition/modules/Hasher.ts --network localhost
```

### Deploying the Hasher contract to a live network

This example is for Sepolia. Other networks will require configuration.

First, create the `env` file and then fill the needed variables:

```sh
cp .env.example .env
```

Then, run the deployment module. The `deployment_id` is optional, but it helps if you want to verify the contract in the next step:

```sh
npx hardhat ignition deploy ignition/modules/Hasher.ts --network sepolia --deployment-id YOUR_DEPLOYMENT_NAME
```

If you want to verify the contract, run:

```sh
npx hardhat ignition verify YOUR_DEPLOYMENT_NAME
```
