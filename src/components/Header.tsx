import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Button,
  HStack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <NextLink href="/" passHref>
            <Heading as="h1" fontSize="xl" cursor="pointer">
              dev.5h4ru.com
            </Heading>
          </NextLink>
          <HStack as="nav" spacing="4">
            <Button size="md" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <NavLinks />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

const NavLinks: FC = () => {
  return (
    <>
      <Link as={NextLink} href="/blog">
        Blog
      </Link>
      <Link href="https://twitter.com">Twitter</Link>
    </>
  )
}
