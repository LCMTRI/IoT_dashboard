/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state = { authData: null }, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "OPEN_CHATTING": {
      return { ...state, openChatting: action.value };
    }
    case "OPEN_CHAT": {
      return { ...state, openChat: action.value };
    }
    case "OPEN_CLOCK": {
      return { ...state, openClock: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "SET_VISIBLE": {
      return { ...state, visible: action.value };
    }
    case "SET_SEARCHCONTENT": {
      return { ...state, searchContent: action.value };
    }
    case "SET_TEMPDATA": {
      return { ...state, tempData: action.value };
    }
    case "SET_HUMDATA": {
      return { ...state, humData: action.value };
    }
    case "SET_LANDHUMDATA": {
      return { ...state, landhumData: action.value };
    }
    case "SET_LIGHTDATA": {
      return { ...state, lightData: action.value };
    }
    case "SET_PUMPDATA": {
      return { ...state, pumpData: action.value };
    }
    default: {
      return state;
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    openChatting: false,
    openChat: false,
    openClock: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    visible: false,
    searchContent: "",
    tempData: [],
    humData: [],
    landhumData: [],
    lightData: [],
    pumpData: []
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setOpenChatting = (dispatch, value) => dispatch({ type: "OPEN_CHATTING", value });
const setOpenChat = (dispatch, value) => dispatch({ type: "OPEN_CHAT", value });
const setOpenClock = (dispatch, value) => dispatch({ type: "OPEN_CLOCK", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

const setVisible = (dispatch, value) => dispatch({ type: "SET_VISIBLE", value });
const setSearchContent = (dispatch, value) => dispatch({ type: "SET_SEARCHCONTENT", value });

const setTempData = (dispatch, value) => dispatch({ type: "SET_TEMPDATA", value });
const setHumData = (dispatch, value) => dispatch({ type: "SET_HUMDATA", value });
const setLandhumData = (dispatch, value) => dispatch({ type: "SET_LANDHUMDATA", value });
const setLightData = (dispatch, value) => dispatch({ type: "SET_LIGHTDATA", value });
const setPumpData = (dispatch, value) => dispatch({ type: "SET_PUMPDATA", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setOpenChatting,
  setOpenChat,
  setOpenClock,
  setDirection,
  setLayout,
  setDarkMode,
  setVisible,
  setSearchContent,
  setTempData,
  setHumData,
  setLandhumData,
  setLightData,
  setPumpData,
};
