import Login from "./components/0.Header/Login";
import Footer from "./components/0.Footer/Footer";
import MakeCopyright from "./components/0.Body/1.Create/MakeCopyright";
import Galery from "./components/Galery";
import MarketPlace from "./components/0.Body/1.MarketPlace/MarketPlace";
import { TokenContextProvider } from "./context/TokenContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


function DappFaucet() {
  return (
    <TokenContextProvider>
      <div>
        <Login />
        <main>

          <Tabs align="center" variant="soft-rounded" colorScheme="teal" >
            <TabList >
              <Tab borderWidth="4px" m="1rem" fontSize="2xl">
                CPR
              </Tab>
              
              <Tab borderWidth="4px" m="1rem" fontSize="2xl">
                Gallery
              </Tab>

              <Tab borderWidth="4px" m="1rem" fontSize="2xl">
                MarketPlace
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={50}>
                <MakeCopyright />
              </TabPanel>
              <TabPanel>
                <Galery />
              </TabPanel>
              <TabPanel>
                <MarketPlace />
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
