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
    title: "Car Model",
    dataIndex: "model",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Car DID",
    dataIndex: "cardid",
  },
  {
    title: "Maker DID",
    dataIndex: "address",
  },
  {
    title: "Token Consumed",
    dataIndex: "tokenconsumed",
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
    title: "Maker DID",
    dataIndex: "address",
  },
  {
    title: "Token Consumed",
    dataIndex: "tokenConsumed",
  },
];

export default function ShowRoomSearch(props) {
  const [carDID, setcarDID] = useState("Deafult");

  const myContract = props.myContractObj;

  const [carDetails, setCarDetails] = useState([]);
  const [componentDetails, setcomponentDetails] = useState([]);

  const getCarDetails = async (cardid) => {
    let cardatas = await myContract.methods.carDetails(cardid).call();
    let newCar = [{
      key: cardid,
      model: cardatas.carModel,
      cardid: cardid,
      address: cardatas.maker,
      tokenconsumed: cardatas.tokenConsumed,
    }];

    console.log("hai", newCar);
    setCarDetails(newCar);
    getComponetDetails(carDID);
  };

  const getComponetDetails = async (carID) => {
    let cardatas = await myContract.methods.getCarDetails(carID).call();
    console.log("CarData: ", cardatas);
    let componentList = cardatas[3];
    console.log(componentList);
    let componentDetailsList = [];
    for (let i = 0; i < componentList.length; i++) {
      let componentdata = await myContract.methods
        .componentDetails(componentList[i])
        .call();
      let newComponent = {
        key: i,
        componetid: componentList[i],
        name: componentdata.componentName,
        address: componentdata.maker,
        tokenConsumed: componentdata.tokenConsumed,
      };
      componentDetailsList.push(newComponent);
    }

    setcomponentDetails(componentDetailsList);
  };

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

  const caridChangeHandler = (event) => {
    setcarDID(event.target.value);
    console.log(event.target.value);
  };

  const submitHandle = (event) => {
    getCarDetails(carDID);
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search Car Details
        </Typography>

        <TextField
          variant="outlined"
          required
          fullWidth
          id="cardid"
          label="Enter Car DID"
          name="cardid"
          autoComplete="cardid"
          onChange={caridChangeHandler}
          className={classes.input}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={submitHandle}
          className={classes.submit}
        >
          Find
        </Button>

        <div style={{ width: 1000 }}>
          <Divider />
          <Table columns={columns} dataSource={carDetails} />
        </div>

        <div style={{ width: 1000 }}>
          <Divider />
          <Table columns={columnsT2} dataSource={componentDetails} />
        </div>
      </div>
    </Container>
  );
}
