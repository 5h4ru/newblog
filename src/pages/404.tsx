import { Container, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Header } from '@/components/Header'

const NotFound = () => {
  return (
    <>
      <Header />
      <Container as="main" maxWidth="container.lg" pt="12">
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="shorter"
          mb="0.5rem"
        >
          Page Not Found.
        </Heading>
        <Text>
          <Link as={NextLink} href="/" color="teal.500">
            Back to home.
          </Link>
        </Text>
      </Container>
    </>
  )
}

export default NotFound
