import { Box, Flex, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react"
import type { Post } from "../modules"
import NextLink from "next/link"
import { Datetime } from "./Datetime"

type Props = {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(({ id, date, title }) => (
        <Box key={id}>
          <Link as={NextLink} href={`/blog/${id}`}>
            <Heading as="h1" fontSize="2xl">
              {title}
            </Heading>
          </Link>
          <Datetime>
            {date}
          </Datetime>
          <Stack mt="4" mb="4" />
        </Box>
      ))}
    </>
  )
}