import type { Paragraph, Text } from 'mdast'
import type { Node, Parent } from 'unist'
import { remove } from 'unist-util-remove'
import { CONTINUE } from 'unist-util-visit-parents'
import { visitParents } from 'unist-util-visit-parents'

export type createNewNodeType = (node: Text, parent: Paragraph) => Node & Parent

const stack: Array<number> = []
const dummyNodeType = 'dummy'

export const replaceNode = <T>(parent: Paragraph, newNode: T) => {
  Object.assign(parent, newNode)
}

export const mergeNodes = (
  startIndex: number,
  endIndex: number,
  parents: Array<Parent>,
) => {
  const siblingNodes = parents[0].children as Array<Parent>
  const innerNodes: Array<Node> = []

  for (let i = startIndex + 1; i < endIndex; i++) {
    innerNodes.push(Object.assign({}, siblingNodes[i]))
  }

  siblingNodes[startIndex].children = innerNodes

  // 後で消すためのフラグ
  const dummyNodeType = 'dummy'
  for (let i = startIndex + 1; i <= endIndex; i++) {
    siblingNodes[i].type = dummyNodeType
  }
}

export const visitor =
  (nodeName: string, marker = ':::', createNewNode: createNewNodeType) =>
  (node: Text, parents: Array<Parent>) => {
    const nodeText: string = node.value
    const parent = parents[1] as Paragraph
    const parentIndex = (parents[0] as Parent).children.indexOf(parent)

    const PREFIX = new RegExp('^' + marker + nodeName + '\\s*(.*)')
    const SUFFIX_SINGLE = new RegExp('\n' + marker + '$')
    const SUFFIX_MULTIPLE = new RegExp('^' + marker + '$')

    if (nodeText && PREFIX.test(nodeText) && SUFFIX_SINGLE.test(nodeText)) {
      const newNode = createNewNode(node, parent)
      node.value = nodeText.slice(nodeText.indexOf('\n') + 1, -4)
      const newParagraph = {
        type: 'paragraph',
        children: [{ ...node }],
      }
      newNode.children = [newParagraph]
      replaceNode(parent, newNode)

      return CONTINUE
    }
    if (nodeText && PREFIX.test(nodeText)) {
      const newNode = createNewNode(node, parent)
      replaceNode(parent, newNode)
      node.value = nodeText.slice((marker + nodeName).length + 1)

      stack.push(parentIndex)

      return CONTINUE
    }
    if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
      const startIndex = stack.pop()
      if (typeof startIndex === 'undefined') return
      mergeNodes(startIndex, parentIndex, parents)
    }
  }

const conveter = (
  tree: Node,
  nodeName: string,
  marker: string,
  handler: createNewNodeType,
) => {
  visitParents(tree, 'text', visitor(nodeName, marker, handler))
  remove(tree, dummyNodeType)
}

export default conveter
