import type { Paragraph, Text } from 'mdast'
import type { Handler, State } from 'mdast-util-to-hast'
import type unified from 'unified'
import type { Node, Parent } from 'unist'
import type { VFileCompatible } from 'vfile'
import conveter from './node-converter'
import type { createNewNodeType } from './node-converter'

const PREFIX = /^:::details\s*(.*)/

const detailsType = 'details'

type Details = Parent & {
  type: 'details'
  title?: string
}

const getTitle = (text: string) => {
  return text.match(PREFIX)?.[1]
}

const createNewNode: createNewNodeType = (node: Text, parent: Paragraph) => {
  const nodeText: string = node.value
  const newNode: Details = {
    ...parent,
    type: detailsType,
    title: getTitle(nodeText),
  }
  return newNode
}

export const details: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    conveter(tree, 'details', ':::', createNewNode)
  }
}

export const detailsHandler: Handler = (state: State, node: Details) => {
  const summaryMDAst = {
    type: 'summary',
    children: [{ type: 'text', value: node.title }],
  }
  node.children.unshift(summaryMDAst)
  return {
    type: 'element',
    tagName: 'details',
    properties: {},
    children: state.all(node as any),
  }
}

export const summaryHandler: Handler = (state: State, node: Node) => {
  return {
    type: 'element',
    tagName: 'summary',
    properties: {},
    children: state.all(node as any),
  }
}
