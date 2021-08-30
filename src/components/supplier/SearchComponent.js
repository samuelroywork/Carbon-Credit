import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import QRCode from "qrcode.react";

import { Table, Divider } from "antd";
import "antd/dist/antd.css";

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

export default function SearchComponent(props) {
  const [componentID, setcomponentID] = useState("");

  const [componentDetails, setcomponentDetails] = useState([]);

  
  const getComponetDetails = async (cDID) => {

      let componentdata = await myContract.methods
        .componentDetails(cDID)
        .call();
      let newComponent = [{
        key: cDID,
        componetid: cDID,
        name: componentdata.componentName,
        tokenConsumed: componentdata.tokenConsumed,
      }];
    setcomponentDetails(newComponent);
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandle = (event) => {
    getComponetDetails(componentID);    
  };
  
  const compDIDChangeHandler = (event) => {
    setcomponentID(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search Component
        </Typography>

        <TextField
          variant="outlined"
          required
          fullWidth
          id="compDID"
          label="Enter Component DID"
          name="compDID"
          autoComplete="compDID"
          onChange={compDIDChangeHandler}
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

        <div style={{ width: 800 }}>
          <Divider />

          <Table
            columns={columnsT2}
            dataSource={componentDetails}
          />
        </div>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickOpen}
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
              <QRCode value={componentID} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Container>
  );
}
