import { Circle, Container} from "@chakra-ui/react"
import { useState } from "react"
import Transfer from "./Transfer"
import Approval from "./Approval"
import TransfertFrom from "./TransferFrom"

const Tab1 = ({nft}) => {
  const [value, setValue] = useState("send")
  console.log(value)
  return (
    <Container>
      <Circle position="relative" bottom="2.5rem" left="-4rem"  size="16" fontWeight="bold" fontSize="40" bg="tomato" color="white">
        {nft.id}
      </Circle>
        {value === "send" && <Transfer id={nft.id} setValue={setValue}/>}
        {value === "approve" && <Approval id={nft.id} setValue={setValue} />}
        {value === "transferFrom" && <TransfertFrom id={nft.id} setValue={setValue} />}
    </Container>
  )
}

export default Tab1