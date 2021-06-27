import {
  Container,
  Textarea,
  Heading
} from "@chakra-ui/react"
import { useState } from "react"
import CreateNFT from "./CreateNFT"

const MakeCopyright = () => {
  let [value, setValue] = useState({content: "", title: "", author: "", url: ""})

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue({...value, content: inputValue})
  }

  return (
  <Container centerContent="true" maxW="75%" id="NFT">
      <Heading pb="10">CREATE A COPYRIGHT NFT !</Heading>
      <Textarea 
        value={value.content}
        onChange={handleInputChange}
        placeholder="Here is a sample placeholder"
        size="lg"
        type="flushed"
        isRequired="true"
        height="50vh"
      />
      <CreateNFT value={value} setValue={setValue} />
  </Container>
  )
}

export default MakeCopyright