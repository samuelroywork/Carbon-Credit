import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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

export default function ComponentList(props) {
  const [componentID, setcomponentID] = useState("");

  useEffect(() => {
    getComponetDetails();
  }, []);

  const [componentDetails, setcomponentDetails] = useState([]);

  
  const getComponetDetails = async () => {
    let componentList = await myContract.methods
      .getComponentList(ethereum.selectedAddress)
      .call();

    let componentDetailsList = [];

    for (let i = 0; i < componentList.length; i++) {
      let componentdata = await myContract.methods
        .componentDetails(componentList[i])
        .call();
      let newComponent = {
        key: i,
        componetid: componentList[i],
        name: componentdata.componentName,
        tokenConsumed: componentdata.tokenConsumed,
      };
      componentDetailsList.push(newComponent);
    }

    setcomponentDetails(componentDetailsList);
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

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Component List
        </Typography>

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
