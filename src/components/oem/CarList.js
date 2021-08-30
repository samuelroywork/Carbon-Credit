import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import QRCode from "qrcode.react";

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

export default function CarList(props) {
  const [carDID, setcarDID] = useState("Deafult");

  useEffect(() => {
    getCarDetails();
  }, []);

  const [carDetails, setCarDetails] = useState([]);
  const [componentDetails, setcomponentDetails] = useState([]);

  const getCarDetails = async () => {
    let carList = await myContract.methods
      .getCarList(ethereum.selectedAddress)
      .call();
    console.log(carList);
    let carsDetailsList = [];

    for (let i = 0; i < carList.length; i++) {
      let cardatas = await myContract.methods.carDetails(carList[i]).call();
      let newCar = {
        key: i,
        model: cardatas.carModel,
        cardid: carList[i],
        address: cardatas.maker,
        tokenconsumed: cardatas.tokenConsumed,
      };
      carsDetailsList.push(newCar);
    }
    console.log("hai", carsDetailsList);
    setCarDetails(carsDetailsList);
  };

 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let carid = selectedRows[0].cardid;
      console.log("table", selectedRows[0]);
      setcarDID(carid);
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Car List
        </Typography>

        <div style={{ width: 1000 }}>
          <Divider />

          <Table
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={carDetails}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className={classes.submit}
        >
          Generate QR Code
        </Button>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <QRCode value={carDID} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Container>
  );
}
