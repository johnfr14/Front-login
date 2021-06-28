import { Center, Container, Circle } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Tab1 from "./Tab1"
import Tab2 from "./Tab2"
import Tab3 from "./Tab3"

const NFT = ({nft}) => {

  return (
  <Container backgroundColor="purple.400" borderRadius="3rem" height="30rem" width="24rem" >
    <Circle mb="-8" position="relative" bottom="1rem" left="-11rem"  size="16" fontWeight="bold" fontSize="40" bg={nft.isApprove ? "gray.500" : "tomato"} color="white">
      {nft.id}
    </Circle>

    <Tabs variant="soft-rounded" colorScheme="green" defaultIndex={1}>
        <TabPanels>
          <TabPanel>
            <Tab1 nft={nft}/>
          </TabPanel>

          <TabPanel >
            <Tab2 nft={nft}/>
          </TabPanel>

          <TabPanel pb="0">
            <Tab3 nft={nft} />
          </TabPanel>

        </TabPanels>
        <Center>
          <TabList mt="10" mb="5">
            <Tab>Tab 1</Tab>
            <Tab selected>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
        </Center>
    </Tabs>

  </Container>
    )

}

export default NFT