import React, { useContext, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Text,
  Image,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import { Jelly } from '../types/jelly'
import { ConnectionContext } from '../contexts/ConnectionContext'
import { ethers } from 'ethers'

type JellyModalProps = {
  jelly: Jelly
}

const JellyModal = ({ jelly }: JellyModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { jellyContract, accounts } = useContext(ConnectionContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [openSeaLink, setOpenSeaLink] = useState<string>();
  const baseOpenseaLink = "https://testnets.opensea.io/collection/jellies";

  const mintJelly = async () => {
    setLoading(true)
    await jellyContract?.mintJellyNFT(jelly.characterIndex)
  }

  const onMint = (jelly: Jelly) => {
    setLoading(false)
    console.log('JellyNFTMinted', jelly);
  }

  useEffect(() => {
    jellyContract?.on('JellyNFTMinted', onMint)

    return () => {
      if (jellyContract) {
        jellyContract.off('JellyNFTMinted', onMint)
      }
    }
  }, [])

  return (
    <>
      <Flex
        key={jelly.characterIndex}
        flexDir="column"
        align="center"
        border="solid 1px black"
        bgColor="white"
        borderRadius="30px"
        padding="30px"
        onClick={onOpen}
      >
        <Image src={jelly.imageURI} boxSize={10} />
        <Text>{jelly.name}</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">{jelly.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" align="center">
              <Image src={jelly.imageURI} boxSize={150} />
              <Flex flexDir="column" align="center">
                <Heading fontSize="24px" my="15px">
                  Attributes:
                </Heading>
                <Text>Speed: {Number(jelly.speed)}</Text>
                <Text>Jump Height: {Number(jelly.jumpHeight)}</Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="space-around" alignItems="center">
              <Text alignSelf="flex-start" as='u'>
                <a href={openSeaLink} target="_blank">View Collection on OpenSea</a>
              </Text>

            <Flex>
              <Button
                colorScheme="red"
                mr={3}
                onClick={mintJelly}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Mint'}
              </Button>
              <Button variant="ghost" onClick={onClose} disabled={loading}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JellyModal
