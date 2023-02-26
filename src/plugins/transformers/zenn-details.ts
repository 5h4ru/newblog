import type { Paragraph, Text } from 'mdast'
import type { Handler, State } from 'mdast-util-to-hast'
import type unified from 'unified'
import type { Node, Parent } from 'unist'
import { remove } from 'unist-util-remove'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'
import type { VFileCompatible } from 'vfile'
import { mergeNodes } from './node-converter'

const PREFIX = /^:::details\s*(.*)$/m
const SUFFIX_SINGLE = /\n:::$/
const SUFFIX_MULTIPLE = /^:::$/

const detailsType = 'details'
const dummyNodeType = 'dummy'
const stack: Array<number> = []

type Details = Parent & {
  type: 'details'
  title?: string
}

const getTitle = (text: string) => {
  return text.match(PREFIX)?.[1]
}

const createNewNode = (parent: Paragraph, props = {}) => {
  const newNode: Details = {
    ...parent,
    type: detailsType,
    title: '',
    ...props,
  }
  return newNode
}

const replaceNode = <T>(parent: Paragraph, newNode: T) => {
  Object.assign(parent, newNode)
}

const visitor = (node: Text, parents: Array<Parent>) => {
  const nodeText: string = node.value
  const parent = parents[1] as Paragraph
  const parentIndex = (parents[0] as Parent).children.indexOf(parent)

  if (nodeText && PREFIX.test(nodeText) && SUFFIX_SINGLE.test(nodeText)) {
    node.value = nodeText.slice(nodeText.indexOf('\n') + 1, -4)
    const newNode = createNewNode(parent, {
      title: getTitle(nodeText),
    })
    replaceNode(parent, newNode)

    return CONTINUE
  }

  if (nodeText && PREFIX.test(nodeText)) {
    node.value = nodeText.slice(':::details'.length + 1)
    const newNode = createNewNode(parent, {
      title: getTitle(nodeText),
    })
    replaceNode(parent, newNode)

    stack.push(parentIndex)

    return CONTINUE
  }

  if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
    const startIndex = stack.pop()
    if (startIndex) mergeNodes(startIndex, parentIndex, parents)
  }
}

export const details: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    visitParents(tree, 'text', visitor)
    remove(tree, dummyNodeType)
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
