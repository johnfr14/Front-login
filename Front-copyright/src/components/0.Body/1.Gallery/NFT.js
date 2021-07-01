import { Center, Container, Circle} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react"
import { useState } from "react"
import Tab1 from "./Tab1"
import Tab2 from "./Tab2"
import Tab3 from "./Tab3"
import Listing from "./Listing"

const NFT = ({nft}) => {
  const [tabIndex, setTabIndex] = useState(1)
  
  return (
  <Container backgroundColor="purple.400" borderRadius="3rem" height="30rem" width="24rem" >
    <Circle mb="-8" position="relative" bottom="1rem" left="-11rem"  size="16" fontWeight="bold" fontSize="40" bg={nft.isApprove ? "gray.500" : "tomato"} color="white">
      {nft.id}
    </Circle>

    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="soft-rounded" colorScheme="green" defaultIndex={1}>
        <TabPanels>
          <TabPanel aria-labelledby="1">
            <Tab1 nft={nft}/>
          </TabPanel>

          <TabPanel >
            <Tab2 setTabIndex={setTabIndex} nft={nft}/>
          </TabPanel>

          <TabPanel aria-labelledby="2" pb="0">
            <Tab3 nft={nft} />
          </TabPanel>

          <TabPanel aria-labelledby="3" pb="0">
            <Listing nft={nft} />
          </TabPanel>

        </TabPanels>
        <Center>
          <TabList mt="10" mb="5">
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>info</Tab>
            <Tab>Listing</Tab>
          </TabList>
        </Center>
    </Tabs>

  </Container>
    )

}

export default NFT