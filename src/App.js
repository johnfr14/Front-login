import React, { useState } from "react";
import DappFaucet from "./DappFaucet";
import { useContract } from "web3-hooks";
import { CopyrightAddress, CopyrightAbi } from "./contracts/SacemEnPLS";
import { MarketPlaceAbi, MarketPlaceAddress} from "./contracts/MarketPlacCPR"
import { aggregatorV3InterfaceABI, ETHAddress, BTCAddress } from "./contracts/ChainlinkPriceFeed"
import Login from "./components/0.Body/Logging/Login"

export const CopyrightContext = React.createContext(null);

function App() {
  const CPR = useContract(CopyrightAddress, CopyrightAbi);
  const Market = useContract(MarketPlaceAddress, MarketPlaceAbi)
  const ETHPriceFeed = useContract(ETHAddress, aggregatorV3InterfaceABI)
  const BTCPriceFeed = useContract(BTCAddress, aggregatorV3InterfaceABI)

  const [isLogged, setIsLogged] = useState("false")

  return (
    <CopyrightContext.Provider value={{CPR, Market, ETHPriceFeed, BTCPriceFeed}}>
      <DappFaucet /> 
    </CopyrightContext.Provider>
  );
}

export default App;
