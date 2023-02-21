import { Container, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { PostList } from '../../components/PostList'
import type { Post } from '../../modules'
import { Header } from '@/components/Header'
import { getSortedPostsData } from '@/lib/posts'

type Props = {
  allPostsData: Post[]
}

const PostPage: NextPage<Props> = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Header />
      <Container as="main" maxWidth="container.lg" pt="12">
        <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="8">
          投稿一覧
        </Heading>
        <PostList posts={allPostsData} />
      </Container>
    </>
  )
}

export default PostPage

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
