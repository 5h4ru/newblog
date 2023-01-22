import { NextPage } from "next"
import { Header } from "../components/Header"
import type { Post } from "../modules"
import { Container, Heading } from "@chakra-ui/react"

type Props = {
  allPostsData: Post[]
}

const Home: NextPage<Props> = () => {
  return (
    <>
      <Header />
      <Container as="main" maxWidth="container.lg" marginTop="4" marginBottom="16">
        <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="8">
          Home
        </Heading>
      </Container>
    </>
  )
}

export default Home