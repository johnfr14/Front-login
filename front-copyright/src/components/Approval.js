import { Text, Box, Input, Button, Center, Spacer, Container, FormLabel } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useToken } from "../context/TokenContext";
import { useContext, useState, useEffect } from "react";
import { Web3Context } from "web3-hooks"
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { CopyrightContext } from "../App"
import { ethers } from "ethers";
import AlertPop from "./AlertPop";
import { CircularProgress } from "@chakra-ui/react"

const Approval = ({id, setValue}) => {
  const [web3State] = useContext(Web3Context)
  const { token } = useToken()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast()
  const CPR = useContext(CopyrightContext)

  const handleSubmitButton = async (data) => {
    const amount = ethers.utils.parseEther(data.amountApprove)
    try {
      setLoading(true)
      const tx = await CPR.approve(data.approveAddress, amount)
      const network = web3State.networkName.toLowerCase()
      const link = `https://${network}.etherscan.io/tx/${tx.hash}`
      toast({title: 'Confirmed transaction',
            render: () => (
              <Box color="white" p={3} bg="green.500" rounded={20}>
                  <p style={{fontWeight: "bold", fontSize: "20px"}}>Transaction sent successfully !</p><br />You can view your transaction pending at hash :<br /><a target="blank" href={link}>{tx.hash}</a>
                </Box>),
            duration: 9000,
            isClosable: true,
      })
      await tx.wait()
    } catch (e) {
      toast({
          title: 'Error',
          description: `${e.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // si simpleStorage est pas null alors
    if (CPR) {
      const cb = (owner, spender, value) => {
        if(spender === web3State.account.toLowerCase()){
           toast({
            title: 'New approval',
            description: `You are now allowed to spend ${ethers.utils.formatEther(value)} ${token.symbol} from ${owner}`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        } else if (owner.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: 'Approved',
            description: `You have allowed ${spender} to spend ${ethers.utils.formatEther(value)} ${token.symbol} from your wallet`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }

      // ecouter sur l'event DataSet
      CPR.on('Approval', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
      CPR.off('Approval', cb)
      }
    }
  }, [CPR, toast, token, web3State.account])
  return (
    <Container centerContent mt="-3rem" fontWeight="bold">
      <Text align="center" fontSize="3xl">Approval</Text>
        <form onSubmit={handleSubmit(handleSubmitButton)} id="first-name" m={2}>
          <FormLabel>To address</FormLabel>
          <Input placeholder="Authorize this contract to spend your moula" mb={2} isRequired
          {...register("approveAddress", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })}
          />
          {errors.approveAddress && <AlertPop title={errors.approveAddress.message} />}
            <Center>
              <Button onClick={() => setValue("transferFrom")} colorScheme="teal" variant="solid" w="50%" m={2} mb={3}><ArrowLeftIcon /></Button>
              <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3} disabled={loading}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
              <Button onClick={() => setValue("approve")} colorScheme="teal" variant="solid" w="50%" m={2} mb={3}><ArrowRightIcon /></Button>
            </Center>
         </form>
    </Container>
  );
};

export default Approval;
