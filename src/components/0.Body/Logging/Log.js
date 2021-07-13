import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Button,
  Input,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import axios from "axios"

const Log = ({setIsLogged}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast()
  const { toggleColorMode } = useColorMode()

  const handleSubmitButton = async (data) => {
    try {
      const response = await axios({
      method: 'post',
      url: 'http://localhost:7777/Log',
      data: {
        username: data.username,
        password: data.password
      }
    });
    if (response.data.logged) {
      setIsLogged(true)
    } else {
      throw new Error(response.data)
    }
    
    } catch (e) {
      toast({
        title: 'Error',
        description: `${e.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  } 

 return (
    <form onSubmit={handleSubmit(handleSubmitButton)} m={2} >
      <Flex direction="column" >
        <Heading mb="6">Log in</Heading>

        <FormControl id="email">
          <FormLabel>UserName</FormLabel>
          <Input placeholder="john" mb={3} isRequired {...register("username")}/>

          <FormLabel>Password</FormLabel>
          <Input placeholder="******" type="password" mb={6} isRequired {...register("password")}/>
        </FormControl>

        <Button type="submit" colorScheme="teal" mb={6}>Log in</Button>
        <Button onClick={toggleColorMode} colorScheme="teal">Toggle color mode</Button>
      </Flex>
    </form>
 ) 
}

export default Log