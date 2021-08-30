import { useState } from "react";
import React from "react";
import "./App.css";
import AdminHomePage from "./components/admin/AdminHomePage";
import HomePage from "./components/nonuser/HomePage";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Web3 from "web3";

import SupplierHomePage from "./components/supplier/SupplierHomePage";
import OEMHomePage from "./components/oem/OEMHomePage";

const App = () => {
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [loginState, setLoginState] = useState("home");

  const ethereum = window.ethereum;

  const MyContractJSON = require("./contractjson/CarbonCredit.json");

  // console.log(RecontractAddress);

  const web3 = new Web3(ethereum);
  const contractAddress = MyContractJSON.networks["5777"].address;
  const contractAbi = MyContractJSON.abi;

  const myContract = new web3.eth.Contract(contractAbi, contractAddress);

  if (ethereum) {
    ethereum.on("accountsChanged", async function (accounts) {
      const userData = await myContract.methods
        .userDetails(ethereum.selectedAddress)
        .call();
      if (
        userData.userType === "OEM" ||
        userData.userType === "Supplier" ||
        userData.userType === "Admin"
      ) {
        setLoginState(userData.userType);
      } else {
        setOpen(true);
        setLoginState("home");
      }
    });
  }

  function userLogin(userRole) {
    setLoginState(userRole);
  }

  if (loginState === "home") {
    return (
      <div className="App">
        <HomePage myContractObj={myContract} setRoleFun={userLogin} />
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Invalid User
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  } else if (loginState === "OEM") {
    return (
      <div className="App">
        <OEMHomePage myContractObj={myContract} we3Obj={web3} />
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Invalid User
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  } else if (loginState === "Supplier") {
    return (
      <div className="App">
        <SupplierHomePage myContractObj={myContract} we3Obj={web3} />
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Invalid User
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  } else if (loginState === "Admin") {
    return (
      <div className="App">
        <AdminHomePage myContractObj={myContract} we3Obj={web3} contractAddress={contractAddress} />
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Invalid User
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
};

export default App;
