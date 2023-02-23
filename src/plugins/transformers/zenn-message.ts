import { Root, Paragraph, Text } from 'mdast'
import { State } from 'mdast-util-to-hast'
import unified from 'unified'
import { Node } from 'unist'
import { remove } from 'unist-util-remove'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'
import { VFileCompatible } from 'vfile'

const PREFIX = /^:::message\s*(.*)\n/
const PREFIX_ALERT = /^:::message alert\n/
const SUFFIX_SINGLE = /\n:::$/
const SUFFIX_MULTIPLE = /^:::$/

const messageType = 'message'
const dummyNodeType = 'dummy'
const stack: Array<number> = []

type Message = {
  type: 'paragraph' | 'message'
  isAlert: boolean
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
    const newNode: Message = { ...parent, isAlert: false }
    newNode.type = messageType
    newNode.isAlert = PREFIX_ALERT.test(nodeText) ? true : false
    Object.assign(parent, newNode)
    return CONTINUE
  }

  if (nodeText && PREFIX.test(nodeText)) {
    const title = getTitle(nodeText)
    node.value = nodeText.slice(':::message'.length + 1)
    const newNode: Message = { ...parent, isAlert: false }
    newNode.type = messageType
    newNode.isAlert = PREFIX_ALERT.test(nodeText) ? true : false
    Object.assign(parent, newNode)

    stack.push(parentIndex)

    return CONTINUE
  }

  if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
    const startIndex = stack.pop()
    if (startIndex) margeNodes(startIndex, parentIndex, parents)
  }
}

export const message: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    visitParents(tree, 'text', visitor)
    remove(tree, dummyNodeType)
  }
}

export const messageHandler = (state: State, node: any) => {
  let classProps = `msg message`
  if (node.isAlert) {
    classProps = `msg alert`
  }
  // const summaryMDAst = {
  //   type: 'summary',
  //   children: [{ type: 'text', value: node.title }],
  // }
  // node.children.unshift(summaryMDAst)
  return {
    type: 'element',
    tagName: 'aside',
    properties: {
      className: [classProps],
    },
    children: state.all(node),
  }
}
