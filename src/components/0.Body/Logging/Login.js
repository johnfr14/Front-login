import { Center, Flex, Text } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import Log from "./Log"
import Register from "./Register"

const Login = ({setIsLogged}) => {
  const [tabIndex, setTabIndex] = useState(0)
  const formaBackground = useColorModeValue("gray.200", "gray.600")
  const boutonBackground = useColorModeValue("", "white")

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" >

      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="soft-rounded" colorScheme="green" defaultIndex={1} background={formaBackground} p={12} rounded={6} w="40%">
        <TabPanels>
          <TabPanel aria-labelledby="1">
            <Log setIsLogged={setIsLogged}/>
          </TabPanel>

          <TabPanel >
            <Register setTabIndex={setTabIndex}/>
          </TabPanel>
        </TabPanels>

        <Center mt="10">
          <Text>Not yet registered ?</Text>
        </Center>

        <Center>
          <TabList mt="3" mb="5">
            <Tab border="solid gray 2px" background={boutonBackground} mx="2">Log in</Tab>
            <Tab background={boutonBackground}>Register</Tab>
          </TabList>
        </Center>
      </Tabs>

    </Flex>
  )
}

export default Login