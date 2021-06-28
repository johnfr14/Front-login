import { Center, Heading, SimpleGrid, Button, Text, Spacer, Box } from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"

const Tab3 = ({ nft }) => {
  return (
    <Box>
      <Center mt="-4">
        <Heading as="h1" size="lg">{nft.title}</Heading>
      </Center>

      <SimpleGrid columns={1} spacing={4} mt="2"  fontSize="1rem" >
        <Center>
          <Text fontWeight="bold">Name</Text>
          <Spacer />
          <Text >{nft.name}</Text>
        </Center>
          
        <Center>
          <Text  fontWeight="bold">NFT id</Text>
          <Spacer />
          <Text >{nft.id}</Text>
        </Center>
        
        <Center>
          <Text fontWeight="bold">Hash</Text>
          <Spacer />
          <Text >
            <Popover>
              <PopoverTrigger>
                <Button>Click</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{nft.hash}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Text>
        </Center>
        
        <Center>
          <Text fontWeight="bold">content length</Text>
          <Spacer />
          <Text>{nft.content.length}</Text>
        </Center>
        
        <Center>
          <Text  fontWeight="bold">Author</Text>
          <Spacer />
          <Text>{nft.author}</Text>
        </Center>
        
        <Center>
          <Text fontWeight="bold">Image url</Text>
          <Spacer />
          <Text>
            <Popover>
              <PopoverTrigger>
                <Button>Click</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{nft.url}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Text>
        </Center>
        
        <Center>
          <Text  fontWeight="bold">Creation date</Text>
          <Spacer />
          <Text>{nft.timeStamp}</Text>
        </Center>
          
      </SimpleGrid>
    </Box>
  )
}

export default Tab3