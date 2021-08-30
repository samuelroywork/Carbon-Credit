import React from "react";
import clsx from "clsx";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ContactsIcon from "@material-ui/icons/Contacts";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InitialSupply from "./InitialSupply";
import AddManager from "./AddManager";
import RemoveManager from "./RemoveManager";
import AdminDashBoard from "./AdminDashBoard";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import DIDResolver from "../DIDResolver";
import UserList from "./UserList";
import SearchIcon from "@material-ui/icons/Search";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import ShowRoomSearch from "../oem/ShowRoomSearch";
import ShowRoom from "../oem/ShowRoom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdminHomePage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ color: "white" }}>
              Carbon Credit System
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link
              to="/initialsupply"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Initial Supply">
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary="Initial Supply" />
              </ListItem>
            </Link>

            <Link
              to="/userlist"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="User List">
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItem>
            </Link>

            <Link
              to="/getdid"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Did Details">
                <ListItemIcon>
                  <VideoLabelIcon />
                </ListItemIcon>
                <ListItemText primary="Did Details" />
              </ListItem>
            </Link>

            <Link
              to="/addmanager"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Add Manager">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Manager" />
              </ListItem>
            </Link>

            <Link
              to="/removemanager"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Remove Manager">
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Remove Manager" />
              </ListItem>
            </Link>

            <Link
              to="/showroom"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Car Showroom">
                <ListItemIcon>
                  <DriveEtaIcon />
                </ListItemIcon>
                <ListItemText primary="Car Showroom" />
              </ListItem>
            </Link>

            <Link
              to="/showroomsearch"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button key="Search Car">
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search Car" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/">
              <AdminDashBoard
                myContractObj={props.myContractObj}
                we3Obj={props.we3Obj}
                contractAddress={props.contractAddress}
              />
            </Route>
            <Route path="/initialsupply">
              <InitialSupply myContractObj={props.myContractObj} />
            </Route>
            <Route path="/getdid">
              <DIDResolver />
            </Route>
            <Route path="/userlist">
              <UserList myContractObj={props.myContractObj} />
            </Route>
            <Route path="/addmanager">
              <AddManager myContractObj={props.myContractObj} />
            </Route>
            <Route path="/removemanager">
              <RemoveManager myContractObj={props.myContractObj} />
            </Route>
            <Route exact path="/showroom">
              <ShowRoom myContractObj={props.myContractObj} />
            </Route>
            <Route exact path="/showroomsearch">
              <ShowRoomSearch myContractObj={props.myContractObj} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
