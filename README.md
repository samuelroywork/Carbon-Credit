# Master Thesis Implementation

This repository contains the prototype implementation for the Master Thesis with the title "Tracing Carbon Footprint Across Automobile Supply Chain and Payment of Carbon Price using Blockchain.

The prototype demonstrates how blockchain can be used as a unified carbon tracing and carbon price payments platform using blockchain.



### Setup the Blockchain

Two blockchain networks could be used. Either Geth or Truffle ganache-cli could be used 
- [Ganache-CLI](https://github.com/trufflesuite/ganache-cli)
- [Geth](https://geth.ethereum.org/)

Set up the blockchain such that it is running using the network id: 5777 and running on the port: 8545.


#### Using Truffle to deploy the smart contract on the blockchain
-Using a command prompt navigate to carbon_credit_main/ and run the command to download all dependencies:

```sh
npm install
```

-Using a command prompt navigate to the scontracts folder and run the command:

```sh
truffle migrate
```

-After the contracts are deployed, copy the truffle artifacts i.e. the json files and paste them in the folder carbon_credit_main/src/contractjson.

-Go to carbon_credit_main/ and run the command:


```sh
npm start
```

-Runs the app in the development mode.

-Open http://localhost:3000 to view the app in the browser.

#### To run the simulation 

-To run the simulation navigate to carbon_credit_main/simulation and ensure that the ganache/geth is running on port 8545 and the smart contracts are deployed by truffle. After that run:
 

  ```sh
 node sim.js
```
