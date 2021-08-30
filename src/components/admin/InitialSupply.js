import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Table, Divider } from "antd";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Name",
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
  {
    title: "User Type",
    dataIndex: "usertype",
  },
];

export default function InitialSupply(props) {
  const [initialSupplyAddressList, setinitialSupplyAddressList] = useState([]);
  const [listCountChange, setlistCountChange] = useState("");
  const [initialSupplyAmpunt, setinitialSupplyAmpunt] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const [userDetails, setuserDetails] = useState([]);

  const getUserDetails = async () => {
    const userListCount = await myContract.methods.userListCOunt().call();
    console.log(userListCount);
    let usersList = [];

    for (let i = 0; i < userListCount; i++) {
      let userdata = await myContract.methods.userList(i).call();
      usersList.push(userdata);
    }

    let usersDetailsList = [];

    for (let i = 0; i < userListCount; i++) {
      let userdatas = await myContract.methods.userDetails(usersList[i]).call();
      console.log(userdatas);
      if (userdatas.userType !== "Banned") {
        let newUser = {
          key: i,
          name: userdatas.userName,
          location: userdatas.userLocation,
          address: usersList[i],
          usertype: userdatas.userType,
        };
        usersDetailsList.push(newUser);
      }
    }

    setuserDetails(usersDetailsList);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let selection = [];
      let rowCount = selectedRows.length;
      for (let i = 0; i < rowCount; i++) {
        selection.push(selectedRows[i].address);
      }
      setinitialSupplyAddressList(selection);
      setlistCountChange(rowCount);
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
      .initialSupply(
        initialSupplyAddressList,
        listCountChange,
        initialSupplyAmpunt
      )
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
  };

  const initialSupplyAmpuntChangeHandler = (event) => {
    setinitialSupplyAmpunt(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Initial Supply
        </Typography>

        <div style={{ height: 400, width: 800 }}>
          <Divider />

          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={userDetails}
          />
        </div>

        <form noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="initialSupplyAmpunt"
            label="Initial Supply Amount"
            name="initialSupplyAmpunt"
            autoComplete="initialSupplyAmpunt"
            onChange={initialSupplyAmpuntChangeHandler}
            className={classes.input}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Allocate
          </Button>
        </form>
      </div>
    </Container>
  );
}
