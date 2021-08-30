import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
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

export default function UserList(props) {
  const [didAddress, setdidAddress] = useState([]);

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
      setdidAddress(selectedRows[0].address);
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
    const infoValue = await myContract.methods
      .removeUser(didAddress)
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
    getUserDetails();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          System Users
        </Typography>

        <div style={{ height: 400, width: 800 }}>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={submitHandler}
          className={classes.submit}
        >
          Remove User
        </Button>
      </div>
    </Container>
  );
}
