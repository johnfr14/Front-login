import { Heading, Center, Container, Image, Circle } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import ContentModal from "./contentModal"
import Tab1 from "./Tab1"

const NFT = ({nft}) => {
  return (
  <Container backgroundColor="purple.300" borderRadius="3rem" maxW="3000px">
      <Tabs variant="soft-rounded" colorScheme="green" defaultIndex={1}>
          <TabPanels>
            <TabPanel>
              <Tab1 nft={nft}/>
            </TabPanel>

            <TabPanel>
              <Center>
                <Heading as="h1" size="lg" mb="-10" pt="3">{nft.title}</Heading>
              </Center>
              
              <Circle position="relative" bottom="3rem" left="-3rem"  size="16" fontWeight="bold" fontSize="40" bg="tomato" color="white">
                {nft.id}
              </Circle>

              <Center>
                  <Image
                    boxSize={nft.url ? "200px": ""}
                    objectFit="cover"
                    src={nft.url}
                    alt={nft.url ? nft.title : ""}
                    borderRadius="xl"
                  />
              </Center>
              <Center>
                <ContentModal content={nft.content}/>
              </Center>
            </TabPanel>
            <TabPanel>
              <Center>
                <Heading as="h1" size="lg" mb="-10" pt="3">{nft.title}</Heading>
              </Center>
              <Circle position="relative" bottom="3rem" left="-3rem"  size="16" fontWeight="bold" fontSize="40" bg="tomato" color="white">
                {nft.id}
              </Circle>
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