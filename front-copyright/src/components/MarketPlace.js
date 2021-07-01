import { Container, SimpleGrid, Heading, Button } from "@chakra-ui/react"
import { CopyrightContext } from "../App"
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks";
import { MarketPlaceAddress } from "../contracts/MarketPlacCPR";
import { ethers } from "ethers";
import NFTListed from "./NFTListed"

const MarketPlace = () => {
  const [web3State] = useContext(Web3Context);
  const [listing, setlisting] = useState([]);
  const [etherBalance, setEtherBalance] = useState(0);
  const {CPR, Market} = useContext(CopyrightContext)

  const handleGetEtherButton = async () => {
    try {
      console.log("coucou")
      Market.withdraw()
    } catch (e) {
      console.log(e.message)
    }
  }
 
  useEffect(() => {
    if(web3State.chainId === 4) {
      const getNFT = async () => {
        try {
          const listingApproved = []
          const totalSupply = await CPR.totalSupply()
          const name = await CPR.name()
          const ethBalance = await Market.getEtherBalance()
          for(let i = 1; i <= totalSupply.toString(); i++ ) {
            let approved = await CPR.getApproved(i)
            if (approved === MarketPlaceAddress) {
              const nft = await CPR.getCPRById(i)
              const price = await CPR.getPrice(i)
              listingApproved.push({
                name: name,
                hash: nft.contentHash,
                content: nft.content,
                title: nft.title,
                author: nft.author,
                url: nft.url,
                timeStamp: nft.timeStamp.toString(),
                id: i,
                price: ethers.utils.formatEther(price),
              })
            } 
          }
          setlisting(listingApproved)
          setEtherBalance(ethers.utils.formatEther(ethBalance))
        } catch (e) {
          console.log(e.message)
        }
      }
        getNFT()
    }   
  }, [CPR, Market, web3State])

  return (
  <Container centerContent maxW="container.xl" py="10">
    <Heading mb="5">Market Cat</Heading>
    <Button onClick={handleGetEtherButton}>Claim {etherBalance} eth</Button>
    <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
      {listing.map((el, index) => {
        return <NFTListed key={index} nft={el}></NFTListed>
      })}
    </SimpleGrid>
  </Container>
  )
}

export default MarketPlace