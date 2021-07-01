import { Box } from "@chakra-ui/react"
import { useState } from "react"
import Transfer from "../Transfer"
import Approval from "./Approval"
import TransfertFrom from "../TransferFrom"

const Tab1 = ({nft}) => {
  const [value, setValue] = useState(2)
  return (
    <Box>
        {value === 1 && <TransfertFrom nft={nft} value={value} setValue={setValue} />}
        {value === 2 && <Transfer nft={nft} value={value} setValue={setValue}/>}
        {value === 3 && <Approval nft={nft} value={value} setValue={setValue} />}
    </Box>
  )
}

export default Tab1