import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function AddComponet(props) {
  const myContract = props.myContractObj;
  const ethereum = window.ethereum;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);

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

  const [componetName, setcomponetName] = useState("");
  const [tokenConsumed, settokenConsumed] = useState("");
  const [comqunantity, setcomQunantity] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    for(let i =0; i < comqunantity; i++) {
      let componentId = props.we3Obj.eth.accounts.create().address;
      const infoValue = await myContract.methods
        .produceComponet(componentId, componetName, 2, tokenConsumed)
        .send({ from: ethereum.selectedAddress });
      console.log(infoValue);
    }
    setOpen(true);
  };

  const componetNameChangeHandler = (event) => {
    setcomponetName(event.target.value);
  };

  const tokenConsumedChangeHandler = (event) => {
    settokenConsumed(event.target.value);
  };

  const cquntitiyChangeHandler = (event) => {
    setcomQunantity(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Component
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            autoComplete="componetName"
            name="componetName"
            variant="outlined"
            required
            fullWidth
            id="componetName"
            label="Componet Name"
            autoFocus
            onChange={componetNameChangeHandler}
            className={classes.input}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="cquntitiy"
            label="Required Quantity"
            name="cquntitiy"
            autoComplete="cquntitiy"
            onChange={cquntitiyChangeHandler}
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
            Add New Componet
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
          Componet(s) Added Successfull
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
