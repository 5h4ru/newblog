import { Header } from "@/src/components/Header";
import { getAllPostIds, getPostData } from "@/src/lib/posts";
import { Container, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import type { Post } from "../../modules"
import { MarkdownPemplate } from "@/src/components/MarkdownTemplate";
import Head from "next/head";

type Props = {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}

const Post = ({ postData }: Props) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Header />
      <Container as="main" maxW="container.lg" pt="12" >
        <Stack>
          <Heading as="h1" fontSize="3xl">
            {postData.title}
          </Heading>
          <Text>
            {postData.date}
          </Text>
        </Stack>

        <Divider marginY="8" />
        <MarkdownPemplate source={postData.contentHtml} />
      </Container>
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}
