import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type props = {
    children: ReactNode,
}

export const Datetime = ({ children }: props) => {
    return (
        <Box as="time" color="gray.500" fontWeight="lighter">
            {children}
        </Box>
    )
}