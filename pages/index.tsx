import { Flex, Heading, Text, Image } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex flexDir="column" align="center" paddingY="30px" minHeight="100vh">
      <Head>
        <title>Jelly Markeplace</title>
      </Head>
      <Flex flexDir="column" align="center">
        <Heading mb="30px" fontSize="48px">
          Jelly Jam Marketplace
        </Heading>
        <Text fontSize="24px">
          Buy, Sell, and Trade NFTs to use in the game{' '}
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
          justify="center"
          wrap="wrap"
          textAlign="center"
          paddingY="20px"
        >
          <Heading fontSize="24px" w="100%" textAlign="center" mb="10px">
            Jelly NFTs
          </Heading>
          <Flex flexDir="column" w="15%" align="center">
            <Text>Red Jelly</Text>
            <Image src="jellies/RedJelly.png" boxSize={50} objectFit="cover" />
          </Flex>
          <Flex flexDir="column" w="15%" align="center">
            <Text>Green Jelly</Text>
            <Image
              src="jellies/GreenJelly.png"
              boxSize={50}
              objectFit="cover"
            />
          </Flex>
          <Flex flexDir="column" w="15%" align="center">
            <Text>Yellow Jelly</Text>
            <Image
              src="jellies/YellowJelly.png"
              boxSize={50}
              objectFit="cover"
            />
          </Flex>

          <Flex flexDir="column" w="15%" align="center">
            <Text>Pink Jelly</Text>
            <Image src="jellies/PinkJelly.png" boxSize={50} objectFit="cover" />
          </Flex>
          <Flex flexDir="column" w="15%" align="center">
            <Text>Blue Jelly</Text>
            <Image src="jellies/BlueJelly.png" boxSize={50} objectFit="cover" />
          </Flex>
          <Flex flexDir="column" w="15%" align="center">
            <Text>Black Jelly</Text>
            <Image
              src="jellies/BlackJelly.png"
              boxSize={50}
              objectFit="cover"
            />
          </Flex>
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
            <Image src="maps/GraveyardBG.png" boxSize={300} objectFit="cover" />
          </Flex>
          <Flex flexDir="column" m="20px">
            <Text>Winter Theme</Text>
            <Image src="maps/WinterBG.png" boxSize={300} objectFit="cover" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
