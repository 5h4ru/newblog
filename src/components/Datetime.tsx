import { Box } from '@chakra-ui/react'

export const Datetime = ({ children }: { children: string }) => {
  return (
    <Box as="time" color="gray.500">
      {children}
    </Box>
  )
}
