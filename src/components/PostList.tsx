import { Box, Flex, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react"
import type { Post } from "../modules"
import NextLink from "next/link"

type Props = {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(({ id, date, title }) => (
        <Flex key={id}>
          <Link as={NextLink} href={`/blog/${id}`}>
            <Heading as="h2" fontSize="xl">
              {title}
            </Heading>
          </Link>
          <Spacer />
          <Text mt="2">
            {date}
          </Text>
          <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
        </Flex>
      ))}
    </>
  )
}