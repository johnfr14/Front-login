import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Button,
  Input,
  useColorMode,
} from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import axios from "axios"

const Register = ({setTabIndex}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast()
  const { toggleColorMode } = useColorMode()

  const handleSubmitButton = async (data) => {
    try {
      if (data.password !== data.password2) {
        throw new Error("the passwords are not the same please retry")
      }

      const response = await axios({
      method: 'post',
      url: 'http://localhost:7777/register',
      data: {
        username: data.username,
        password: data.password
      }
    })

    toast({
      title: 'Registered',
      description: `${response.data}`,
      status: 'success',
      position: "top-right",
      duration: 5000,
      isClosable: true,
    })
    setTabIndex(0)
    
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
      <Flex direction="column">
        <Heading mb="6">Register</Heading>

        <FormControl id="email">
          <FormLabel>UserName</FormLabel>
          <Input placeholder="john" mb={3} isRequired {...register("username")}/>

          <FormLabel>Password</FormLabel>
          <Input placeholder="******" type="password" mb={6} isRequired {...register("password")}/>

        <FormLabel>Confirm Password</FormLabel>
        <Input placeholder="******" type="password" mb={6} isRequired {...register("password2")} />
        </FormControl>

        <Button type="submit" colorScheme="teal" mb={6}>Register</Button>
        <Button onClick={toggleColorMode} colorScheme="teal">Toggle color mode</Button>
      </Flex>
    </form>
 ) 
}

export default Register