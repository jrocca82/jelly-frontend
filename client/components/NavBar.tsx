import React, { useContext } from 'react'
import { Flex, Image, Text, Heading } from '@chakra-ui/react'
import { ConnectionContext } from '../contexts/ConnectionContext'
import truncateEthAddress from 'truncate-eth-address'
import Link from 'next/link'

const NavBar = () => {
  const { connectWallet, accounts } = useContext(ConnectionContext)
  return (
    <Flex
      w="100%"
      justify="space-between"
      align="center"
      padding="25px"
      bgColor="#ADD8E6"
      color="black"
    >
      <Heading fontSize="48px">Jelly Jam Marketplace</Heading>
      <Flex w="250px" justify="space-around" align="center" flexDir="column">
        {accounts ? (
          <Text>Connected to: {truncateEthAddress(accounts[0])}</Text>
        ) : (
          <>
            <Image src="metamask.png" boxSize={20} onClick={connectWallet} />
            <Text>Connect Wallet or</Text>
          </>
        )}
        <Text>
          <a href="https://jrocca82.github.io/jelly-web3/" target="_blank">
            Go to Jelly Jam
          </a>
        </Text>
        <Link href="/">
          <Text>Home</Text>
        </Link>
        <Link href="my-jellies">
          <Text>View My NFTs</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default NavBar
