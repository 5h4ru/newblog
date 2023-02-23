import { Root, Paragraph, Text } from 'mdast'
import { State } from 'mdast-util-to-hast'
import unified from 'unified'
import { Node } from 'unist'
import { remove } from 'unist-util-remove'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'
import { VFileCompatible } from 'vfile'

const PREFIX = /^:::details\s*(.*)$/m
const SUFFIX_SINGLE = /\n:::$/
const SUFFIX_MULTIPLE = /^:::$/

const detailsType = 'details'
const dummyNodeType = 'dummy'
const stack: Array<number> = []

type Details = {
  type: 'paragraph' | 'details'
  title?: string
  children: Array<Node>
}

const margeNodes = (
  startIndex: number,
  endIndex: number,
  parents: Array<Node>,
) => {
  const siblingNodes: Array<any> = (parents[0] as Root).children
  const innerNodes: Array<Node> = []

  for (let i = startIndex + 1; i < endIndex; i++) {
    innerNodes.push(Object.assign({}, siblingNodes[i]))
  }

  siblingNodes[startIndex].children = innerNodes

  // 後で消すためのフラグ
  for (let i = startIndex + 1; i <= endIndex; i++) {
    siblingNodes[i].type = dummyNodeType
  }
}

const getTitle = (text: string) => {
  return text.match(PREFIX)?.[1]
}

const visitor = (node: Text, parents: Array<Node>) => {
  const nodeText: string = node.value
  const parent = parents[1] as Paragraph
  const parentIndex = (parents[0] as Root).children.indexOf(parent)

  if (nodeText && PREFIX.test(nodeText) && SUFFIX_SINGLE.test(nodeText)) {
    const title = getTitle(nodeText)
    node.value = nodeText.slice(nodeText.indexOf('\n') + 1, -4)
    const newNode: Details = { ...parent }
    newNode.type = detailsType
    newNode.title = title
    Object.assign(parent, newNode)

    return CONTINUE
  }

  if (nodeText && PREFIX.test(nodeText)) {
    const title = getTitle(nodeText)
    node.value = nodeText.slice(':::details'.length + 1)
    const newNode: Details = { ...parent }
    newNode.type = detailsType
    newNode.title = title
    Object.assign(parent, newNode)

    stack.push(parentIndex)

    return CONTINUE
  }

  if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
    const startIndex = stack.pop()
    if (startIndex) margeNodes(startIndex, parentIndex, parents)
  }
}

export const details: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    visitParents(tree, 'text', visitor)
    remove(tree, dummyNodeType)
  }
}

export const detailsHandler = (state: State, node: any) => {
  const summaryMDAst = {
    type: 'summary',
    children: [{ type: 'text', value: node.title }],
  }
  node.children.unshift(summaryMDAst)
  return {
    type: 'element',
    tagName: 'details',
    properties: {},
    children: state.all(node),
  }
}

export const summaryHandler = (state: State, node: any) => {
  return {
    type: 'element',
    tagName: 'summary',
    properties: {},
    children: state.all(node),
  }
}
