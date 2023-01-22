import { Header } from "@/src/components/Header";
import { getAllPostIds, getPostData } from "@/src/lib/posts";
import { Container, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import type { Post } from "../../modules"

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
      <Header />
      <Container as="main" maxW="container.md" mt="4" mb="16">
        <Heading as="h1" fontSize="4xl" lineHeight={1.6} >
          {postData.title}
        </Heading>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
