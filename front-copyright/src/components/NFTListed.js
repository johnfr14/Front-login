import { Center, Container, Circle} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react"
import Tab2Listed from "./Tab2Listed"
import Tab3 from "./Tab3"

const NFTListed = ({nft}) => {
  
  return (
  <Container backgroundColor="purple.400" borderRadius="3rem" height="30rem" width="24rem" >
    <Circle mb="-8" position="relative" bottom="1rem" left="-11rem"  size="16" fontWeight="bold" fontSize="40" bg={nft.isApprove ? "gray.500" : "tomato"} color="white">
      {nft.id}
    </Circle>

    <Tabs variant="soft-rounded" colorScheme="green" defaultIndex={1}>
        <TabPanels>

          <TabPanel >
            <Tab2Listed nft={nft}/>
          </TabPanel>

          <TabPanel aria-labelledby="2" mt="2.5rem">
            <Tab3 nft={nft} />
          </TabPanel>

        </TabPanels>
        <Center>
          <TabList mb="5" >
            <Tab _selected>Tab 1</Tab>
            <Tab>info</Tab>
          </TabList>
        </Center>
    </Tabs>

  </Container>
    )

}

export default NFTListed