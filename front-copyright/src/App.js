import "./App.css";
import React from "react";
import DappFaucet from "./DappFaucet";
import { useContract } from "web3-hooks";
import { CopyrightAddress, CopyrightAbi } from "./contracts/SacemEnPLS";
import { MarketPlaceAbi, MarketPlaceAddress} from "./contracts/MarketPlacCPR"
//import Nav from "./components/Nav";

export const CopyrightContext = React.createContext(null);

function App() {
  const CPR = useContract(CopyrightAddress, CopyrightAbi);
  const Market = useContract(MarketPlaceAddress, MarketPlaceAbi)

  return (
    <CopyrightContext.Provider value={{CPR, Market}}>
        <DappFaucet />
    </CopyrightContext.Provider>
  );
}

export default App;
