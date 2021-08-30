import React, {useState} from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export default function AddManager(props) {

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

  const [ethAddress, setethAddress] = useState("");

  const submitHandler = async(event) => {
    event.preventDefault();

    const infoValue = await myContract.methods.addManger(ethAddress).send({ from: ethereum.selectedAddress});
    console.log(infoValue);
    
    };

  const ethAddressChangeHandler = (event) => {
    setethAddress(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Manager
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            autoComplete="ethAddress"
            name="ethAddress"
            variant="outlined"
            required
            fullWidth
            id="ethAddress"
            label="Ethereum Address"
            autoFocus
            onChange={ethAddressChangeHandler}
            className={classes.input}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Manager
          </Button>
        </form>
      </div>
    </Container>
  );
}
