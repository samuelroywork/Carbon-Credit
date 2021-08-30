import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function UserLogin(props) {
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
      width: "50%",
    },
  }));

  const classes = useStyles();
  const myContract = props.myContractObj;
  const ethereum = window.ethereum;

  const enableMetaMask = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log(ethereum.selectedAddress);

    const userData = await myContract.methods
      .userDetails(ethereum.selectedAddress)
      .call();
    console.log("User Type:", userData);
    if (
      userData.userType === "OEM" ||
      userData.userType === "Supplier" ||
      userData.userType === "Admin"
    ) {
      props.userLoginFun(userData.userType);
    } else {
      setOpen(true);
      props.userLoginFun("home")
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={enableMetaMask}
        className={classes.submit}
      >
        Login
      </Button>
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Invalid User
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
