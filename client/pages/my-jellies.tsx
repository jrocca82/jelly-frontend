import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { Flex, Heading, Text, Image } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import { ConnectionContext } from '../contexts/ConnectionContext'
import { Jelly } from '../types/jelly'
import { baseJellyOpenseaLink } from '../constants/contractAddresses'
import Link from 'next/link'

const JellyPage: NextPage = () => {
  const { accounts, jellyContract } = useContext(ConnectionContext)
  const [myJellies, setMyJellies] = useState<Jelly[]>()

  const getJellyNfts = async () => {
    if (!accounts) {
      return
    }
    const jellies = await jellyContract?.getUserTokens(accounts[0])
    console.log(jellies)
    setMyJellies(jellies)
  }

  useEffect(() => {
    getJellyNfts()
  }, [accounts])

  return (
    <Flex flexDir="column" align="center" minHeight="100vh" textAlign="center">
      <NavBar />
      {!accounts && <Text>Please connect your metamask to see your NFTs.</Text>}
      {accounts && (
        <Flex flexWrap="wrap" justify="space-around" w="80%">
          <Heading w="100%" textAlign="center" my="50px">
            Your NFTs:
          </Heading>
          {!myJellies && (
            <Text>
              You have no jellies! Go to the <Link href="/">Home Page</Link>to
              mint some!
            </Text>
          )}
          {myJellies &&
            myJellies.map((jelly) => {
              return (
                <Flex
                  m="10px"
                  border="solid 1px black"
                  padding="20px"
                  borderRadius="30px"
                  flexDir="column"
                  align="center"
                  key={jelly.tokenId}
                >
                  <Heading>Token ID: {Number(jelly.tokenId)}</Heading>
                  <Image my="20px" src={jelly.imageURI} boxSize={150} />
                  <Flex flexDir="column" align="center">
                    <Heading fontSize="24px" my="15px">
                      Attributes:
                    </Heading>
                    <Text>Character Index: {Number(jelly.characterIndex)}</Text>
                    <Text>Speed: {Number(jelly.speed)}</Text>
                    <Text>Jump Height: {Number(jelly.jumpHeight)}</Text>
                    <a
                      href={baseJellyOpenseaLink + Number(jelly.tokenId)}
                      target="_blank"
                    >
                      <Text as="u" color="blue">
                        View on OpenSea
                      </Text>
                    </a>
                  </Flex>
                </Flex>
              )
            })}
          <Flex
            my="50px"
            flexDir="column"
            align="center"
            height="100px"
            justify="space-around"
          >
            <Text>
              Game integration coming soon! Check my LinkedIn for updates:{' '}
            </Text>
            <a href="https://www.linkedin.com/in/jo-rocca/" target="_blank">
              <Image src="linkedin.png" boxSize={50} />
            </a>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default JellyPage
