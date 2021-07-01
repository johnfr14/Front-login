import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react"
import {useDisclosure} from "@chakra-ui/react"
import {useRef} from "react"

function ContentModal({content}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        View content
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {content}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ContentModal