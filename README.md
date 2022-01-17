# Master Thesis Implementation

This repository contains the prototype implementation for the Master Thesis with the title "Tracing Carbon Footprint Across Automobile Supply Chain and Payment of Carbon Price using Blockchain.

The prototype demonstrates how blockchain can be used as a unified carbon tracing and carbon price payments platform using blockchain

### Project Abstract

Climate change is one of the most pressing issues of the twenty-rst century, and it is indisputable that human activities drive climate change. Among the various economic sectors, industries such as the automotive industry contribute significantly to greenhouse gas emissions. The automotive supply chain is a complex multi-echelon supply chain with multiple supply chain participants spread globally, all contributing to the different phases of the production of cars and contributing to the greenhouse gas emissions. Automotive supply chains face many challenges that prevent them from effectively managing their carbon emissions and developing a mitigation strategy. The absence of data about the carbon footprint of their products is the most signficant of the challenges. One of the approaches to collecting the carbon emission data is to reliably track the carbon footprint of the product across the automotive supply chain. The main objective of this thesis is to investigate the applicability of blockchain to develop a decentralized carbon emissions tracking system for the automotive supply chain. In addition to this, the thesis proposes a conceptual design to unify the carbon emissions tracking along with the carbon tax payments using carbon credits, which are modeled by tokens on the blockchain network. Furthermore, the thesis proposes using a carbon label with a QR code attached to the product to help in carbon emissions tracking across the supply chain, with the QR code being generated using a self-sovereign digital identity that can be validated on the blockchain. Moreover, a functional prototype of the proposed solution is implemented as a Dapp. Further, evaluations were also performed to validate the scalability and feasibility of the system.

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
