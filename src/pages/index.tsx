import { NextPage } from "next"
import Head from "next/head"
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
      <Head>
        <title>new blog</title>
      </Head>
      <Header />
      <Container as="main" maxWidth="container.lg" pt="12">
        <Heading as="h2" fontSize="2xl" fontWeight="bold" lineHeight="shorter" mb="0.5rem">
          Home
        </Heading>
        <Text as="h3" fontSize="xl" fontWeight="bold" lineHeight="shorter" mb="0.5rem" mt="1.5rem">Next.js + Chakra UI + Vercel でブログをリニューアル中</Text>
        <Text>
          <Link href="https://qlitre-weblog.com/next-microcms-blog-w-chakra-matome" isExternal>
            このサイト <ExternalLinkIcon mx="2px" />
          </Link>
          を大いに参考にしています！
        </Text>
      </Container>
    </>
  )
}

export default Home