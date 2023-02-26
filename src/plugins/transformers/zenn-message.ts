import type { Paragraph, Root, Text } from 'mdast'
import type { Handler, State } from 'mdast-util-to-hast'
import type unified from 'unified'
import type { Node, Parent } from 'unist'
import { remove } from 'unist-util-remove'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'
import type { VFileCompatible } from 'vfile'
import { mergeNodes } from './node-converter'

const PREFIX = /^:::message\s*(.*)\n/
const PREFIX_ALERT = /^:::message alert\n/
const SUFFIX_SINGLE = /\n:::$/
const SUFFIX_MULTIPLE = /^:::$/

const messageType = 'message'
const dummyNodeType = 'dummy'
const stack: Array<number> = []

type Message = Parent & {
  type: 'message'
  isAlert: boolean
}

const createNewNode = (parent: Paragraph, props = {}) => {
  const newNode: Message = {
    ...parent,
    type: messageType,
    isAlert: false,
    ...props,
  }
  return newNode
}

const visitor = (node: Text, parents: Array<Parent>) => {
  const nodeText: string = node.value
  const parent = parents[1] as Paragraph
  const parentIndex = (parents[0] as Root).children.indexOf(parent)

  if (nodeText && PREFIX.test(nodeText) && SUFFIX_SINGLE.test(nodeText)) {
    node.value = nodeText.slice(nodeText.indexOf('\n') + 1, -4)
    const newNode = createNewNode(parent, {
      isAlert: PREFIX_ALERT.test(nodeText),
    })
    Object.assign(parent, newNode)
    return CONTINUE
  }

  if (nodeText && PREFIX.test(nodeText)) {
    node.value = nodeText.slice(':::message'.length + 1)
    const newNode = createNewNode(parent, {
      isAlert: PREFIX_ALERT.test(nodeText),
    })
    Object.assign(parent, newNode)

    stack.push(parentIndex)

    return CONTINUE
  }

  if (nodeText && SUFFIX_MULTIPLE.test(nodeText)) {
    const startIndex = stack.pop()
    if (startIndex) mergeNodes(startIndex, parentIndex, parents)
  }
}

export const message: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    visitParents(tree, 'text', visitor)
    remove(tree, dummyNodeType)
  }
}

export const messageHandler: Handler = (state: State, node: Message) => {
  let classProps = `msg message`
  if (node.isAlert) {
    classProps = `msg alert`
  }
  return {
    type: 'element',
    tagName: 'aside',
    properties: {
      className: [classProps],
    },
    children: state.all(node as any),
  }
}
