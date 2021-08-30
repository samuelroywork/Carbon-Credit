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

export default function AssembleCar(props) {
  const [componentDetails, setcomponentDetails] = useState([]);

  useEffect(() => {
    getComponetDetails();
  }, []);

  const myContract = props.myContractObj;
  const ethereum = window.ethereum;

  const getComponetDetails = async () => {
    console.log("hai");
    let componentList = await myContract.methods
      .getComponentList(ethereum.selectedAddress)
      .call();

    let componentDetailsList = [];

    for (let i = 0; i < componentList.length; i++) {
      let componentdata = await myContract.methods
        .componentDetails(componentList[i])
        .call();
      if (componentdata.quantity = 1) {
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
      let selection = [];
      let rowCount = selectedRows.length;
      for (let i = 0; i < rowCount; i++) {
        selection.push(selectedRows[i].componetid);
      }
      setcomponetList(selection);
    },
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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

  const [carModel, setcarModel] = useState("");
  const [tokenConsumed, settokenConsumed] = useState("");
  const [componetList, setcomponetList] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let carID = props.we3Obj.eth.accounts.create().address;
    const infoValue = await myContract.methods
      .assembleCar(carID, carModel, tokenConsumed, componetList)
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
    getComponetDetails();
  };

  const modelNameChangeHandler = (event) => {
    setcarModel(event.target.value);
  };

  const tokenConsumedChangeHandler = (event) => {
    settokenConsumed(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Assemble Car
        </Typography>
        <div style={{ width: 800 }}>
          <Divider />

          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={componentDetails}
          />
        </div>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            autoComplete="modelName"
            name="modelName"
            variant="outlined"
            required
            fullWidth
            id="modelName"
            label="Model Name"
            autoFocus
            onChange={modelNameChangeHandler}
            className={classes.input}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="tokenConsumed"
            label="Required Tokens"
            name="tokenConsumed"
            autoComplete="tokenConsumed"
            onChange={tokenConsumedChangeHandler}
            className={classes.input}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Assemble
          </Button>
        </form>
      </div>
    </Container>
  );
}
