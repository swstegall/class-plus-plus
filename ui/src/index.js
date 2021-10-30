import "bootstrap-css-only/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import storeFactory from "./redux";

const theme = createTheme({
  palette: {
    primary: {
      light: "#E1FFB1",
      main: "#AED581",
      dark: "#7DA453",
      contrastText: "#000000",
    },
    secondary: {
      light: "#76D276",
      main: "#43A048",
      dark: "#00701C",
      contrastText: "#000000",
    },
    background: {
      default: "#dbdbdb",
    },
  },
});

const store = storeFactory();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
