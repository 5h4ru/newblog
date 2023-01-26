import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
}

export const Datetime = ({ children }: Props) => {
    return (
        <Box as="time" color="gray.500">
            {children}
        </Box>
    )
}