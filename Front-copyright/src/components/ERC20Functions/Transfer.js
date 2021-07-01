import { Text, Box, Input, Button, Spacer, Center, FormLabel, VStack } from "@chakra-ui/react"
import { useToken } from "../context/TokenContext";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { CopyrightContext } from "../App"
import { ethers } from "ethers";
import AlertPop from "./0.Gallery/AlertPop";
import { CircularProgress } from "@chakra-ui/react"
import { Web3Context } from "web3-hooks";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const Transfer = ({nft, value, setValue}) => {
  const [web3State] = useContext(Web3Context);
  const { token } = useToken()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {CPR} = useContext(CopyrightContext)

   useEffect(() => {
    // si simpleStorage est pas null alors
    if (CPR) {
      
      const cb = (from, to, amount) => {

        if(from.toLowerCase() === web3State.account.toLowerCase()){
          toast({
            title: 'Transfer',
            description: `Your transaction of ${ethers.utils.formatEther(amount)} ${token.symbol} has been well executed to ${to}`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter sur l'event DataSet
      CPR.on('Transfer', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
      CPR.off('Transfer', cb)
      }
    }
  }, [CPR, toast, token, web3State.account])


  const handleSubmitButton = async (data) => {
    try {
      setLoading(true)
      const tx = await CPR.transferFrom(web3State.account, data.transfer, nft.id)
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
      if(e.error.code === 3) {
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
          description: `${e.error.message}`,
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
    <VStack fontWeight="bold">
      <Text align="center" fontSize="3xl" mb="10">Transfer</Text>
        <form onSubmit={handleSubmit(handleSubmitButton)} m={2} >
          <FormLabel>To address</FormLabel>
          <Input placeholder="Receiver" mb="5" isRequired
          {...register("transfer", {
            minLength: { value: 42, message: "Please enter a valid address" },
            maxLength: { value: 42, message: "Please enter a valid address" },
          })}
          />
          {errors.transfer && <AlertPop title={errors.transfer.message} />}
        <Center mb="3.7rem">
          <Button onClick={() => setValue(value - 1)} bg="gray.300" variant="solid" m={2} mb={3}><ArrowLeftIcon /></Button>
          <Button type="submit" colorScheme="teal" size="lg" variant="solid" m={2} disabled={loading || nft.isApprove}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
          <Button onClick={() => setValue(value + 1)} bg="gray.300" variant="solid" m={2} mb={3}><ArrowRightIcon /></Button>
        </Center>
        </form>
    </VStack>
  )
}

export default Transfer;
