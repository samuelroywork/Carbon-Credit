import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Table, Divider } from "antd";
import "antd/dist/antd.css";

const columns = [
  {
    title: "OEM Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const columnsT2 = [
  {
    title: "Componet Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Component ID",
    dataIndex: "componetid",
  },
  {
    title: "Token Consumed",
    dataIndex: "tokenConsumed",
  },
];

export default function SendToOEM(props) {
  const [oemAddress, setoemAddress] = useState("");
  const [componentID, setcomponentID] = useState("");

  useEffect(() => {
    getUserDetails();
    getComponetDetails();
  }, []);

  const [userDetails, setuserDetails] = useState([]);
  const [componentDetails, setcomponentDetails] = useState([]);

  const getUserDetails = async () => {
    const userListCount = await myContract.methods.userListCOunt().call();
    console.log(userListCount);
    let usersList = [];

    for (let i = 0; i < userListCount; i++) {
      let userdata = await myContract.methods.userList(i).call();
      console.log(userdata);
      usersList.push(userdata);
    }

    let usersDetailsList = [];

    for (let i = 0; i < usersList.length; i++) {
      let userdatas = await myContract.methods.userDetails(usersList[i]).call();
      if (userdatas.userType === "OEM") {
        let newUser = {
          key: i,
          name: userdatas.userName,
          location: userdatas.userLocation,
          address: usersList[i],
        };
        usersDetailsList.push(newUser);
      }
    }

    setuserDetails(usersDetailsList);
  };

  const getComponetDetails = async () => {
    let componentList = await myContract.methods
      .getComponentList(ethereum.selectedAddress)
      .call();

    let componentDetailsList = [];

    for (let i = 0; i < componentList.length; i++) {
      let componentdata = await myContract.methods
        .componentDetails(componentList[i])
        .call();
        console.log("Com ", componentdata.quantity);
      if (componentdata.quantity > 1) {
        let newComponent = {
          key: i,
          componetid: componentList[i],
          name: componentdata.componentName,
          tokenConsumed: componentdata.tokenConsumed,
        };
        componentDetailsList.push(newComponent);
      }
    }

    setcomponentDetails(componentDetailsList);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let saddress = selectedRows[0].address;
      setoemAddress(saddress);
    },
  };

  const rowSelectionT2 = {
    onChange: (selectedRowKeys, selectedRows) => {
      let cid = selectedRows[0].componetid;
      setcomponentID(cid);
    },
  };

  const myContract = props.myContractObj;
  const ethereum = window.ethereum;

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    input: {
      margin: theme.spacing(1, 0, 1),
    },

    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const submitHandler = async (event) => {
    event.preventDefault();

    const infoValue = await myContract.methods
      .sendToOEM(oemAddress, componentID)
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
    getComponetDetails();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Transfer Componet
        </Typography>

        <div style={{ width: 800 }}>
          <Divider />

          <Table
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={userDetails}
          />
        </div>

        <div style={{ width: 800 }}>
          <Divider />

          <Table
            rowSelection={{
              type: "radio",
              ...rowSelectionT2,
            }}
            columns={columnsT2}
            dataSource={componentDetails}
          />
        </div>

        <form noValidate onSubmit={submitHandler}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Transfer
          </Button>
        </form>
      </div>
    </Container>
  );
}
