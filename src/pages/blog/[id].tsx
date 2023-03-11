import { Container, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import type { Post } from '../../modules'
import { Datetime } from '@/components/Datetime'
import { Header } from '@/components/Header'
import { MarkdownPemplate } from '@/components/MarkdownTemplate'
import { getAllPostIds, getPostData } from '@/lib/posts'

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
      <Container as="main" maxW="container.lg" pt="12">
        <Stack>
          <Heading as="h1" fontSize="3xl">
            {postData.title}
          </Heading>
          <Datetime>{postData.date}</Datetime>
        </Stack>
        <MarkdownPemplate source={postData.contentHtml} />
      </Container>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
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
      postData,
    },
  }
}
