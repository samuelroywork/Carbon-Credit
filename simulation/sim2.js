Web3 = require("web3");
var path = require("path");

const loopLimit = 100;

const web3 = new Web3("http://localhost:8545");

var MyContractJSON = require(path.join(
  __dirname,
  "build/contracts/CarbonCredit.json"
));

accountAddress = "0x99f414CD1044266230F8cC2A69b984e77f64d0fd";
const contractAddress = MyContractJSON.networks["5777"].address;

const contractAbi = MyContractJSON.abi;

const myContract = new web3.eth.Contract(contractAbi, contractAddress);

info();



 signUpSim();
//carAssemblySim();

async function info() {
  console.log("Contract Addres:", contractAddress);
  console.log("Account Balance: ", await web3.eth.getBalance(accountAddress));
}

async function signUpSim() {
  console.time("User Signup Simulation Time Taken: ");
  for (var i = 0; i < loopLimit; i++) {
    let supplierDID = await web3.eth.accounts.create().address;
    let oemDID = await web3.eth.accounts.create().address;

    const txData1 = await myContract.methods
      .newUser(supplierDID, "supplier", "test site", "Supplier")
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Supplier Added. Tx:", txData1.transactionHash);

  }
  console.timeEnd("User Signup Simulation Time Taken: ");
}

async function carAssemblySim() {
  console.time("Car Assembly Simulation Time Taken: ");
  for (var i = 0; i < loopLimit; i++) {
    let comp1DID = await web3.eth.accounts.create().address;
    let comp2DID = await web3.eth.accounts.create().address;
	let comp3DID = await web3.eth.accounts.create().address;
	let comp4DID = await web3.eth.accounts.create().address;
	let comp5DID = await web3.eth.accounts.create().address;
	let comp6DID = await web3.eth.accounts.create().address;
	let comp7DID = await web3.eth.accounts.create().address;
	let comp8DID = await web3.eth.accounts.create().address;
	let comp9DID = await web3.eth.accounts.create().address;
	let comp10DID = await web3.eth.accounts.create().address;
    let carDID = await web3.eth.accounts.create().address;

    const txData1 = await myContract.methods
      .produceComponet(comp1DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData1.transactionHash);

    const txData2 = await myContract.methods
      .produceComponet(comp2DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData2.transactionHash);
	
	const txData3 = await myContract.methods
      .produceComponet(comp3DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData3.transactionHash);
	
	const txData4 = await myContract.methods
      .produceComponet(comp4DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData4.transactionHash);
	
	const txData5 = await myContract.methods
      .produceComponet(comp5DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData5.transactionHash);
	
	const txData6 = await myContract.methods
      .produceComponet(comp6DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData6.transactionHash);
	
	const txData7 = await myContract.methods
      .produceComponet(comp7DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData7.transactionHash);
	
	const txData8 = await myContract.methods
      .produceComponet(comp8DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData8.transactionHash);
	
	const txData9 = await myContract.methods
      .produceComponet(comp9DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData9.transactionHash);
	
	const txData10 = await myContract.methods
      .produceComponet(comp10DID, "Component " + i.toString(), 2, 50)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Added. Tx: ", txData10.transactionHash);

    const txData11 = await myContract.methods
      .sendToOEM(accountAddress, comp1DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData11.transactionHash);

    const txData12 = await myContract.methods
      .sendToOEM(accountAddress, comp2DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData12.transactionHash);
	
	const txData13 = await myContract.methods
      .sendToOEM(accountAddress, comp3DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData13.transactionHash);
	
	const txData14 = await myContract.methods
      .sendToOEM(accountAddress, comp4DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData14.transactionHash);
	
	const txData15 = await myContract.methods
      .sendToOEM(accountAddress, comp5DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData15.transactionHash);
	
	const txData16 = await myContract.methods
      .sendToOEM(accountAddress, comp6DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData16.transactionHash);
	
	const txData17 = await myContract.methods
      .sendToOEM(accountAddress, comp7DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData17.transactionHash);
	
	const txData18 = await myContract.methods
      .sendToOEM(accountAddress, comp8DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData18.transactionHash);
	
	const txData19 = await myContract.methods
      .sendToOEM(accountAddress, comp9DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData19.transactionHash);
	
	const txData20 = await myContract.methods
      .sendToOEM(accountAddress, comp10DID)
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Component Transfered to OEM. Tx: ", txData20.transactionHash);
	

    const txData21 = await myContract.methods
      .assembleCar(carDID, "BMW", 100, [comp1DID, comp2DID,comp3DID,comp4DID,comp5DID,comp6DID,comp7DID,comp8DID,comp9DID,comp10DID])
      .send({ from: accountAddress, gasLimit: "927000" });
    console.log("Car Assembled. Tx: ", txData21.transactionHash);
  }

  console.timeEnd("Car Assembly Simulation Time Taken: ");
}
