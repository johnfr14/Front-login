import NFT from "./NFT"
import {Container, SimpleGrid, Heading} from "@chakra-ui/react"
import { CopyrightContext } from "../App"
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks";

const Galery = () => {
  let [galery, setGalery] = useState([])
  const CPR = useContext(CopyrightContext)
  const [web3State] = useContext(Web3Context);
 
  useEffect(() => {

    const getNFT = async () => {
      const galeryOWned = []
      const totalSupply = await CPR.totalSupply()
      const name = await CPR.name()
      for(let i = 1; i <= totalSupply.toString(); i++ ) {
        let owner = await CPR.ownerOf(i)
        let approved = await CPR.getApproved(i)
        if (owner.toLowerCase() === web3State.account) {
          const nft = await CPR.getCPRById(i)
          console.log(nft.timeStamp.toString())
          galeryOWned.push({
            name: name,
            hash: nft.contentHash,
            content: nft.content,
            title: nft.title,
            author: nft.author,
            url: nft.url,
            timeStamp: nft.timeStamp.toString(),
            id: i,
          })
        } else if (!approved.startsWith('0x000')) {
          const nft = await CPR.getCPRById(i)
          galeryOWned.push({
            name: name,
            hash: nft.contentHash,
            content: nft.content,
            title: nft.title,
            author: nft.author,
            url: nft.url,
            timeStamp: nft.timeStamp.toString(),
            id: i,
            isApprove: true
        })}
      }
      setGalery(galeryOWned)
    }

    try {
      getNFT()
    } catch (e) {
      console.log(e)
    }
  }, [CPR, web3State.account])


  return(
    <Container centerContent as="section" maxW="container.xl" py="10">
      <Heading mb="5">Your NFTs</Heading>
      <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
        {galery.map((el, index) => {
          return <NFT key={index} nft={el}></NFT>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default Galery
