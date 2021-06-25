import { Text, Box, Input, Button, Image, Spacer } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import transferFrom from "../assets/images/transferFrom.jpg";
import {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import { useToken } from "../context/TokenContext";
import { Web3Context } from "web3-hooks";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { CopyrightContext } from "../App"
import { ethers } from "ethers";
import { CircularProgress } from "@chakra-ui/react"
import AlertPop from "./AlertPop";

const TransfertFrom = () => {
  const { token } = useToken()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [web3State] = useContext(Web3Context);
  const [loading, setLoading] = useState(false)
  const [allowance, setallowance] = useState({address: "", amount: 0, isAddress: false})
  const toast = useToast()
  const CPR = useContext(CopyrightContext)

  const handleSender = async (e) => {
    setallowance({address: e.target.value, amount: 0, isAddress: false})
    if(e.target.value.length === 42) {
      try {
        const amount = await CPR.allowance(e.target.value, web3State.account);
        setallowance({address: e.target.value, amount: ethers.utils.formatEther(amount), isAddress: true})
      } catch (e) {
        toast({
          title: 'Error',
          description: `${e.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleSubmitButton = async (data) => {
    const amount = ethers.utils.parseEther(data.amountFrom)
    try {
      if(!ethers.utils.isAddress(allowance.address)){
        throw new Error("the sender must be a valide address")
      }
      setLoading(true)
      const tx = await CPR.transferFrom(allowance.address, data.transferTo, amount)
      const network = web3State.networkName.toLowerCase()
      const link = `https://${network}.etherscan.io/tx/${tx.hash}`
      toast({
        title: 'Confirmed transaction',
        render: () => (
            <Box color="white" p={3} bg="green.500" rounded={20}>
              <p style={{fontWeight: "bold", fontSize: "20px"}}>Transaction sent successfully !</p><br />You can view your pending transaction at hash :<br /><a target="blank" href={link}>{tx.hash}</a>
            </Box>),
        duration: 9000,
        isClosable: true,
      })
      await tx.wait()
    } catch (e) {
      if (e.error !== undefined) {
        toast({
          title: 'Error',
          description: `${e.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error',
          description: `${e.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Text align="center" fontSize="3xl">
        TransferFrom
      </Text>
      <Box maxW="md" borderWidth="2px" borderRadius="md" boxShadow="2xl" p="10" overflow="hidden">
        <Image src={transferFrom} alt="image" />
        <form onSubmit={handleSubmit(handleSubmitButton)} variant="outline" w="75%" m={2} id="first-name" isRequired>
          <FormLabel>From</FormLabel>
          <Input value={allowance.address} onChange={handleSender} placeholder="Sender" isRequired  />
          {allowance.isAddress &&  <>{ allowance.amount > 0 ? <Badge colorScheme="green">Your are allowed to send {allowance.amount} {token.symbol} from this account</Badge> : <Badge colorScheme="red">You have no allowance on this address</Badge>}</> }
          <FormLabel mt={2}>Amount</FormLabel>
          <NumberInput isRequired min={1} max={allowance.amount || 1000000} mb={4} >
              <NumberInputField {...register("amountFrom")}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          <FormLabel>To</FormLabel>
          <Input mb={1} variant="outline" placeholder="Receiver" isRequired {...register("transferTo", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })}/>
          {errors.transferTo && <AlertPop title={errors.transferTo.message} />}
          <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3} disabled={loading}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
        </form>
      </Box>
    </>
  );
};

export default TransfertFrom;