import { NextPage } from "next"
import { Header } from "../components/Header"
import type { Post } from "../modules"
import { Container, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

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
        <Stack spacing={4}>
          <Text fontSize="lg">Next.js + Chakra UI + Vercel でブログをリニューアル中</Text>
          <Text>
            <Link href="https://qlitre-weblog.com/next-microcms-blog-w-chakra-matome" isExternal>
              このサイト <ExternalLinkIcon mx="2px" />
            </Link>
            を大いに参考にしています！
          </Text>
        </Stack>
      </Container>
    </>
  )
}

export default Home