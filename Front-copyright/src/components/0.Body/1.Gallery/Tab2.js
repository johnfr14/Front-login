import { Center, Heading, Image, Container, Button, VStack, HStack} from "@chakra-ui/react"
import ContentModal from "../1.Create/contentModal"


const Tab2 = ({setTabIndex, nft}) => {

return(
<Container>
  <VStack spacing="20px">
    <Center mt="-5" position="relative">
      <Heading as="h1" size="lg">{nft.title}</Heading>
    </Center>

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
      <HStack mt="3">
        <ContentModal content={nft.content}/>
        <Button onClick={() => setTabIndex(3)} colorScheme="orange">List on Market</Button>
      </HStack>
    </Center>
    
  </VStack>
  </Container>
)
}

export default Tab2