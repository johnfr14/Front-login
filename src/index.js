import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3Provider } from "web3-hooks";
import "bootstrap/dist/css/bootstrap.css";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });
// 3. Pass the `theme` prop to the `ChakraProvider`

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <App />
      </Web3Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
