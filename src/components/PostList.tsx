import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react"
import type { Post } from "../modules"
import NextLink from "next/link"

type Props = {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(({ id, date, title }) => (
        <Box key={id}>
          <Link as={NextLink} href={`/blog/${id}`}>
            <Heading as="h2" fontSize="3xl" lineHeight={1.6} marginTop="1" flex={1} cursor="pointer">
              {title}
            </Heading>
          </Link>
          <Text fontSize="xl" mt="2">
            {date}
          </Text>
          <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
        </Box>
      ))}
    </>
  )
}