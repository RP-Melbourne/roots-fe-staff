import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import API from "../../helpers/api";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { LoginContext } from "contexts";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  login: {
    textDecoration: "none"
  }
  
}));

export const Header2 = () => {
  const classes = useStyles();
  const {
    setAccessToken,
    setLoginStatus,
    loginStatus,
    accessToken,
  } = useContext(LoginContext);

  const logout = () => {

    const logOut = async (auth) => {
      const putLogout = await API.logout(auth);
      window.localStorage.clear();
      setLoginStatus(false);
      setAccessToken("");
      console.log(putLogout);
    };

    logOut(accessToken);

  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#2B2B28" }}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            ROOTS
          </Typography>
          <Typography variant="h6" className={classes.title}>
            About us
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Help
          </Typography>
          {loginStatus ? (
            <IconButton color="inherit" onClick={() => logout()}>
              <ExitToApp />
            </IconButton>
          ) : (
            <Link to="/login" className={classes.login}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Login {" > "}
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};