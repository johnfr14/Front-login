import "./App.css";
import React from "react";
import DappFaucet from "./DappFaucet";
import { useContract } from "web3-hooks";
import { CopyrightAddress, CopyrightAbi } from "./contracts/SacemEnPLS";
//import Nav from "./components/Nav";

export const CopyrightContext = React.createContext(null);

function App() {
  const CPR = useContract(CopyrightAddress, CopyrightAbi);

  return (
    <CopyrightContext.Provider value={CPR}>
        <DappFaucet />
    </CopyrightContext.Provider>
  );
}

export default App;
