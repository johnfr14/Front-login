import Faucet from "./components/Faucet";
import Login from "./components/Login";
import { TokenContextProvider } from "./context/TokenContext";


function DappFaucet() {
  return (
    <TokenContextProvider>
        <Login />
        <Faucet />
    </TokenContextProvider>
  );
}

export default DappFaucet;
