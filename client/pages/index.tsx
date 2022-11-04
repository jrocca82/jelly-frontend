import { Flex, Heading, Text, Image, useConst } from '@chakra-ui/react'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import JellyModal from '../components/JellyModal'
import NavBar from '../components/NavBar'
import { ConnectionContext } from '../contexts/ConnectionContext'
import { Jelly } from '../types/jelly'
import {ethers} from "ethers";

export default function Home() {
  const { jellyContract, accounts } = useContext(ConnectionContext)
  const [jellies, setJellies] = useState<Jelly[]>()

  const getAllJellies = async () => {
    const jellies = await jellyContract?.getAllDefaultJellies();
    setJellies(jellies)
  }

  useEffect(() => {
    getAllJellies();
  }, [accounts])

  return (
    <Flex flexDir="column" align="center" minHeight="100vh">
      <Head>
        <title>Jelly Markeplace</title>
      </Head>
      <NavBar />
      {!accounts && (
        <Text>Please connect your metamask to see the marketplace.</Text>
      )}
      {accounts && (
        <Flex flexDir="column" align="center" mt="30px">
          <Text fontSize="24px">
            Buy NFTs to use in the game{' '}
            <a href="https://jrocca82.github.io/jelly-web3/" target="_blank">
              <em>Jelly Jam</em>
            </a>
            .
          </Text>{' '}
          <Flex
            border="solid 1px black"
            borderRadius="30px"
            align="center"
            w="95vw"
            my="30px"
            justify="space-around"
            wrap="wrap"
            textAlign="center"
            paddingY="20px"
            bgColor="#f7f5bc"
            color="black"
          >
            <Heading fontSize="24px" w="100%" textAlign="center" mb="30px">
              Jelly NFTs
            </Heading>
            {jellies?.map((jelly) => {
              return (
                <JellyModal jelly={jelly}/>
              )
            })}
          </Flex>
          <Flex
            border="solid 1px black"
            borderRadius="30px"
            align="center"
            w="95vw"
            my="30px"
            justify="center"
            wrap="wrap"
            textAlign="center"
          >
            <Heading fontSize="24px" w="100%" my="15px">
              Map NFTs
            </Heading>
            <Flex flexDir="column" m="20px">
              <Text>Forest Theme</Text>
              <Image src="maps/ForestBG.png" boxSize={300} objectFit="cover" />
            </Flex>
            <Flex flexDir="column" m="20px">
              <Text>Desert Theme</Text>
              <Image src="maps/DesertBG.png" boxSize={300} objectFit="cover" />
            </Flex>
            <Flex flexDir="column" m="20px">
              <Text>Spooky Theme</Text>
              <Image
                src="maps/GraveyardBG.png"
                boxSize={300}
                objectFit="cover"
              />
            </Flex>
            <Flex flexDir="column" m="20px">
              <Text>Winter Theme</Text>
              <Image src="maps/WinterBG.png" boxSize={300} objectFit="cover" />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
