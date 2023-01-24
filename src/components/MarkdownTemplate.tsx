import {
  BoxProps,
  Box,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Heading,
  Link,
  Image,
  Divider,
  Code as ChakraCode,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"
import parse from "html-react-parser"
import { domToReact, HTMLReactParserOptions } from "html-react-parser"
import hljs from "highlight.js"
import "highlight.js/styles/vs2015.css"
import { ExternalLinkIcon } from "@chakra-ui/icons"

type MarkdownTemplateProps = {
  source: string
} & BoxProps

const h1 = {
  props: {
    mb: "8px",
    fontSize: "xl",
  },
}

const h2 = {
  props: {
    fontSize: "2xl",
    fontWeight: "bold",
    lineHeight: "shorter",
    mb: "0.5rem",
    mt: "3rem"
  },
}

const h3 = {
  props: {
    fontSize: "xl",
    fontWeight: "bold",
    lineHeight: "shorter",
    mb: "0.5rem",
    mt: "1.5rem"
  },
}

const hr = {
  props: {
    mt: "1.5rem",
    mb: "1.5rem",
  }
}

const p = {
  props: {
    lineHeight: "1.8",
    fontSize: "md",
    mt: "0",
    mb: "1rem",
  },
}

const ul = {
  props: {
    mb: "1rem",
  },
}

const ol = {
  props: {
    mb: "1rem",
  }
}

const li = {
  props: {
    fontSize: "md"
  },
}

const blockquote = {
  props: {
    color: "gray.500",
    my: "0.8rem",
    pr: "5rem",
    pl: "1.25rem",
    borderLeft: "0.25rem solid",
    borderColor: "gray.500",
  }
}

const a = {
  props: {
    textDecoration: "none",
    color: "teal.500",
    _hover: {
      textDecoration: "underline"
    },
  },
};

const img = {
  props: {
    border: "1px",
    borderColor: "gray.300"
  }
}

const code = {
  props: {
    borderRadius: "3px",
  },
}

const preCode = {
  props: {
    mb: "1rem",
    fontSize: ".8rem",
    lineHeight: "1.4",
  }
}

const languageSubset = ["js", "html", "css", "xml", "typescript", "python", "c", "cpp"];


const options: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    if (domNode.type === "tag") {
      if (domNode.name === "h1") {
        return (
          <Heading as="h1" {...h1.props}>
            {domToReact(domNode.children, options)}
          </Heading>
        )
      }
      if (domNode.name === "h2") {
        return (
          <Heading as="h2" {...h2.props}>
            {domToReact(domNode.children, options)}
          </Heading>
        )
      }
      if (domNode.name === "h3") {
        return (
          <Text as="h3" {...h3.props}>
            {domToReact(domNode.children, options)}
          </Text>
        )
      }
      if (domNode.name === "hr") {
        return (
          <Divider {...hr.props} />
        )
      }
      if (domNode.name === "ul") {
        return (
          <UnorderedList {...ul.props}>
            {domToReact(domNode.children, options)}
          </UnorderedList>
        )
      }
      if (domNode.name === 'ol') {
        return (
          <OrderedList {...ol.props}>
            {domToReact(domNode.children, options)}
          </OrderedList>
        )
      }
      if (domNode.name === "li") {
        return (
          <ListItem {...li.props}>
            {domToReact(domNode.children, options)}
          </ListItem>
        )
      }
      if (domNode.name === "p") {
        return (
          <Text {...p.props}>{domToReact(domNode.children, options)}</Text>
        )
      }
      if (domNode.name === 'blockquote') {
        return (
          <Box as="blockquote" {...blockquote.props}>
            {domToReact(domNode.children, options)}
          </Box>
        )
      }
      if (domNode.name === "a") {
        const href: string = domNode.attribs.href

        // Internal Link
        if (href?.startsWith("#") || href?.startsWith("/")) {
          return (
            <Link {...a.props} href={href}>
              {domToReact(domNode.children, options)}
            </Link>
          )
        }

        // Externel Link
        return (
          <Link {...a.props} href={domNode.attribs.href} isExternal>
            {domToReact(domNode.children, options)}<ExternalLinkIcon mx="2px" />
          </Link>
        )
      }
      if (domNode.name === 'img') {
        return (
          <Image {...img.props} src={domNode.attribs.src} />
        )
      }
      if (domNode.name === 'code') {
        if (domNode.parent.name === 'pre') {
          const highlightCode = hljs.highlightAuto(
            domToReact(domNode.children) as string,
            languageSubset,
          ).value
          return (
            <Box as="code" className="hljs" {...preCode.props}>
              {parse(highlightCode)}
            </Box>
          )
        }
        return (
          <ChakraCode {...code.props}>
            {domToReact(domNode.children, options)}
          </ChakraCode>
        )
      }

      if (domNode.name === "table") {
        return (
          <TableContainer py="1rem">
            <Table colorScheme="teal">
              {domToReact(domNode.children, options)}
            </Table>
          </TableContainer>
        )
      }
      if (domNode.name === "thead") {
        return (
          <Thead>
            {domToReact(domNode.children, options)}
          </Thead>
        )
      }
      if (domNode.name === "tbody") {
        return (
          <Tbody>
            {domToReact(domNode.children, options)}
          </Tbody>
        )
      }
      if (domNode.name === "th") {
        return (
          <Th>
            {domToReact(domNode.children, options)}
          </Th>
        )
      }
      if (domNode.name === "tr") {
        return (
          <Tr>
            {domToReact(domNode.children, options)}
          </Tr>
        )
      }
      if (domNode.name === "td") {
        return (
          <Td>
            {domToReact(domNode.children, options)}
          </Td>
        )
      }
    }
  }
}

export const MarkdownPemplate = (props: MarkdownTemplateProps) => {
  return <Box {...props}>{parse(props.source, options)}</Box>
}