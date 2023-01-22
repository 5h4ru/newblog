import { NextPage } from "next"
import { GetStaticProps } from "next"
import { getSortedPostsData } from "@/src/lib/posts"
import type { Post } from "../../modules"
import { PostList } from "../../components/PostList"
import { Container, Heading } from "@chakra-ui/react"
import { Header } from "@/src/components/Header"

type Props = {
  allPostsData: Post[]
}

const PostPage: NextPage<Props> = ({ allPostsData }) => {
  return (
    <>
      <Header />
      <Container as="main" maxWidth="container.lg" marginTop="4" marginBottom="16">
        <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="8">
          Posts
        </Heading>
        <PostList posts={allPostsData} />
      </Container>
    </>
  )
}

export default PostPage

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}