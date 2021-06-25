import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useToken } from "../context/TokenContext";
import { CopyrightContext } from "../App";
import Footer from "../components/Footer";


import { Button, Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, rest, Box, Heading, Center, Spacer, CircularProgress } from "@chakra-ui/react";
import CopyrightFunc from "./TokenFunc"

function Faucet() {
  const CPR = useContext(CopyrightContext);
  const { token, balance } = useToken();
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  console.log(CPR)

  const handleClaimToken = async () => {
    setLoading(true)
    try {
      const tx = await CPR.claim();
      await tx.wait()
       toast({
        title: 'Confirmed transaction',
        description: `Success !! we sent you 100 ${token.symbol}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (e) {
      if (e.error !== undefined) {
        toast({
          title: 'Error',
          description: `${e.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error',
          description: `${e.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setLoading(false)
    }
  };

  return (
      <Center>
        <Flex direction="column" w="100%" height="100%">
          <Tabs isLazy>
        <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab borderWidth="4px" fontSize="2xl">
                CPR
              </Tab>
              <Tab borderWidth="4px" fontSize="2xl">
                Functionality RBT
              </Tab>
            </TabList>
            <TabPanels>
              {/* initially mounted */}
              <TabPanel p={50}>
                  <Flex flexDirection="column" alignItems="center" m={4} p={20} boxShadow="2xl" rounded="md" borderWidth="2px" flex="1" {...rest}>
                      <Heading align="center" fontSize="6xl" mb={20}>
                        🔥 CLAIM {} RIGHT NOW ! 🔥 
                      </Heading>
                      <Spacer />
                        <Box w="500px" p={5} bg="gray.300" rounded="xl" fontWeight="bold" mb={20}>
                          Your RBT balance : {balance}
                        </Box>

                        <Button onClick={handleClaimToken} bg="green.400" size="lg" height="60px" width="300px" disabled={loading}>
                          {loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><p>Claiming...</p></>) : "Claim 100 RBT"}
                        </Button>
                       <Footer />
                  </Flex>
              </TabPanel>
              {/* initially not mounted */}
              <TabPanel>
                <CopyrightFunc />
              </TabPanel>
            </TabPanels>
        </Tabs>
        </Tabs>
        </Flex>
      </Center>
  );
}

export default Faucet;
