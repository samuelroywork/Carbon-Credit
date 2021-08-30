import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function DIDResolver(props) {
  const RegContractJSON = require("../contractjson/EthereumDIDRegistry.json");

  const RecontractAddress = RegContractJSON.networks["5777"].address;

  const providerConfig = {
    name: "development",
    rpcUrl: "http://localhost:8545",
    registry: RecontractAddress,
  };

  const ethrDidResolver = getResolver(providerConfig);
  const didResolver = new Resolver(ethrDidResolver);

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
      margin: theme.spacing(1, 0, 2),
    },
    root: {
      width: 950,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [didValue, setdidValue] = useState("");
  const [didDetails, setdidDetails] = useState(["Search for DID"]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const did = "did:ethr:development:" + didValue;
    let diddata = await didResolver.resolve(did);
    setdidDetails(<div><pre>{ JSON.stringify(diddata, null, 2) }</pre></div>)
  };

  const didValueChangeHandler = (event) => {
    setdidValue(event.target.value);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            DID Details
          </Typography>
          <form noValidate onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="didValue"
              label="DID"
              name="didValue"
              autoComplete="didValue"
              onChange={didValueChangeHandler}
              className={classes.input}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Get DID Details
            </Button>
          </form>
          <br />
          <br />
          <div>
            <Card className={classes.root}>
              <CardContent>{didDetails}</CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
