import React from "react";
import ReactDOM from "react-dom/client";
import Theme from "./theme";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { store } from "./store";
import Dialogs from "./components/dialogs";
import Views from './route';
import { BrowserRouter } from "react-router-dom"

const rootID = document.getElementById("root");
const root = ReactDOM.createRoot(rootID);
const theme = createTheme(Theme);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dialogs />
        <Views />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
