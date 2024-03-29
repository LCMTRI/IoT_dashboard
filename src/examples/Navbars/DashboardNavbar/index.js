/* eslint-disable no-param-reassign, no-underscore-dangle */
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

import { Button } from "@material-ui/core";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";

import decode from "jwt-decode";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";
import Search from "./Search";
import socket from "../../../layouts/messenger/socketio";
import * as actionType from "../../../constants/actionTypes";

function DashboardNavbar({ absolute, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, text } }) => ({
    color: () => {
      let colorValue = dark.main;

      if (transparentNavbar) {
        colorValue = text.main;
      }

      return colorValue;
    },
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const authdispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    authdispatch({ type: actionType.LOGOUT });
    socket.current.emit("removeUser", user.result._id);
    setUser(null);
    navigate("/dashboard");
  };

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_mainSocket);
  }, []);

  useEffect(() => {
    const token = user?.token;
    console.log("dash", user);
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="dark.main" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} />
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon sx={iconsStyle} fontSize="medium">
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <Search />
            {user?.result ? (
              <MDBox color="inherit">
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={logout}
                >
                  <Icon sx={iconsStyle}>logout</Icon>
                </IconButton>
              </MDBox>
            ) : (
              <MDBox color="inherit">
                <Button
                  component={Link}
                  to="/authentication/sign-in/"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </MDBox>
            )}
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,

  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
