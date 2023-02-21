import { Root, Paragraph, Text } from 'mdast'
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
  type: 'details'
  title: string
  children: Array<Node>
}

const margeNodes = (
  startIndex: number,
  endIndex: number,
  parents: Array<Node>,
) => {
  const siblingNodes: Array<Node> = (parents[0] as Root).children
  const innerNodes: Array<Node> = []

  for (let i = startIndex + 1; i < endIndex; i++) {
    innerNodes.push(Object.assign({}, siblingNodes[i]))
  }

  (siblingNodes[startIndex] as Details).children = innerNodes

  // 後で消すためのフラグ
  for (let i = startIndex + 1; i <= endIndex; i++) {    siblingNodes[i].type = dummyNodeType  }
}

const getTitle = (text: string) => {
  return text.match(PREFIX)?.[1]
}

const visitor = (node: Text, parents: Array<Node>) => {
  const nodeText: string = node.value
  const parent = parents[parents.length - 1] as Paragraph
  const parentIndex = (parents[parents.length - 2] as Root).children.indexOf(
    parent
  )

  if (nodeText && PREFIX.test(nodeText) && SUFFIX_SINGLE.test(nodeText)) {
    const title = getTitle(nodeText)
    node.value = nodeText.slice(nodeText.indexOf('\n') + 1, -4)

    const newNode = {type: detailsType, title: title, children : parent.children}
    parents[parents.length - 1] = newNode

    return CONTINUE
  } 

  if (nodeText && PREFIX.test(nodeText)) {
    const title = getTitle(nodeText)
    node.value = nodeText.slice(':::details'.length + 1)
    const newNode = {type: detailsType, title: title, children : parent.children}
    parents[parents.length - 1] = newNode
    stack.push(parentIndex)
    return CONTINUE
  }
  
  if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
    const startIndex = stack.pop()
    if (startIndex) margeNodes(startIndex, parentIndex, parents)
  }
}

const details: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    visitParents(tree, 'text', visitor)
    remove(tree, dummyNodeType)
  }
}

export default details
