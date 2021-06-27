import Login from "./components/Login";
import Footer from "./components/Footer";
import MakeCopyright from "./components/MakeCopyright";
import CopyrightFunc from "./components/TokenFunc"
import Galery from "./components/Galery";
import { TokenContextProvider } from "./context/TokenContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


function DappFaucet() {
  return (
    <TokenContextProvider>
      <div>
        <Login />
        <main>
          <Tabs isLazy>

            <TabList>
              <Tab borderWidth="4px" fontSize="2xl">
                CPR
              </Tab>
              <Tab borderWidth="4px" fontSize="2xl">
                Functionality RBT
              </Tab>
              <Tab borderWidth="4px" fontSize="2xl">
                Galery
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={50}>
                <MakeCopyright />
              </TabPanel>
              <TabPanel>
                <CopyrightFunc />
              </TabPanel>
              <TabPanel>
                <Galery />
              </TabPanel>
            </TabPanels>

            </Tabs>
        </main>
        <Footer />
      </div>
    </TokenContextProvider>
  );
}

export default DappFaucet;
