import { BoxProps, Box, Text, UnorderedList, OrderedList, ListItem, Heading, Link, Image } from "@chakra-ui/react"
import parse from "html-react-parser"
import { domToReact, HTMLReactParserOptions } from "html-react-parser"

type MarkdownTemplateProps = {
  source: string
} & BoxProps

const h1 = {
  props: {
    mt: "24px",
    mb: "16px",
    lineHeight: "1.25",
    fontWeight: "600",
    pb: ".3em",
    fontSize: "2em",
    borderBottom: "1px solid #E7ECF2",
  },
}

const h2 = {
  props: {
    mt: "24px",
    mb: "16px",
    lineHeight: "1.25",
    fontWeight: "600",
    pb: ".3em",
    fontSize: "1.5em",
    borderBottom: "1px solid #E7ECF2",
  },
}

const h3 = {
  props: {
    mt: "24px",
    mb: "16px",
    lineHeight: "1.25",
    fontWeight: "600",
    fontSize: "1.25em",
  },
}

const p = {
  props: {
    lineHeight: "1.8",
    mb: "10px",
    fontSize: "18px",
    color: "##000",
  },
}

const ul = {
  props: {
    my: "1",
    lineHeight: "2",
    pl: "1em"
  },
}

const ol = {
  props: {
    my: "1",
    lineHeight: "2",
    pl: "1em"
  }
}

const li = {
  props: {
    fontSize: "18px"
  },
}

const blockquote = {
  props: {
    color: "gray.500",
    my: "1em",
    pl: "1em",
    borderLeft: "2px",
    borderColor: "gray.500",
    fontSize: "18px",
    lineHeight: "1.8",
  }
}

const a = {
  props: {
    isExternal: true,
    textDecoration: "none",
    color: "#3182CE",
    _hover: {
      textDecoration: "none",
      color: "#4593e6",
    },
  },
};

const img = {
  props: {
    border: "1px",
    borderColor: "gray.300"
  }
}

const options: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    if (domNode.type === "tag") {
      if (domNode.name === "h1") {
        return (
          <Heading as="h1" {...h1.props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.name === "h2") {
        return (
          <Heading as="h2" {...h2.props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.name === "h3") {
        return (
          <Text as="h3" {...h3.props}>
            {domToReact(domNode.children, options)}
          </Text>
        );
      }
      if (domNode.name === "ul") {
        return (
          <UnorderedList {...ul.props}>
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
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
        );
      }
      if (domNode.name === 'blockquote') {
        return (
          <Box as="blockquote" {...blockquote.props}>
            {domToReact(domNode.children, options)}
          </Box>
        )
      }
      if (domNode.name === "a") {
        return (
          <Link {...a.props} href={domNode.attribs.href}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
      if (domNode.name === 'img') {
        return (
          <Image {...img.props} src={domNode.attribs.src} />
        )
      }
    }
  }
}

export const MarkdownPemplate = (props: MarkdownTemplateProps) => {
  return <Box {...props}>{parse(props.source, options)}</Box>
}