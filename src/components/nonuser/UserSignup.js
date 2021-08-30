import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Select, MenuItem } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function UserSignup(props) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);

  const myContract = props.myContractObj;
  const ethereum = window.ethereum;

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

  const [aname, setaname] = useState("");
  const [location, setlocation] = useState("");
  const [ethaddress, setethaddress] = useState("");
  const [usertype, setusertype] = useState("Select");

  const submitHandler = async (event) => {
    event.preventDefault();

    const infoValue = await myContract.methods
      .newUser(ethaddress, aname, location, usertype)
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
    setOpen(true);
  };

  const anameChangeHandler = (event) => {
    setaname(event.target.value);
  };

  const locationChangeHandler = (event) => {
    setlocation(event.target.value);
  };

  const ethaddressChangeHandler = (event) => {
    setethaddress(event.target.value);
  };

  const usertypeChangeHandler = (event) => {
    setusertype(event.target.value);
    console.log(event.target.value);
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
          OEM/Supplier Sign up
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            autoComplete="aname"
            name="aname"
            variant="outlined"
            required
            fullWidth
            id="aname"
            label="Name"
            autoFocus
            onChange={anameChangeHandler}
            className={classes.input}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            onChange={locationChangeHandler}
            className={classes.input}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="ethaddress"
            label="Ethereum Address"
            name="ethaddress"
            autoComplete="ethaddress"
            onChange={ethaddressChangeHandler}
            className={classes.input}
          />

          <Select
            labelId="usertype"
            id="usertype"
            value={usertype}
            required
            fullWidth
            variant="outlined"
            onChange={usertypeChangeHandler}
            className={classes.input}
          >
            <MenuItem value="Select">Select</MenuItem>
            <MenuItem value="OEM">OEM</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
          </Select>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Registration Successfull
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
