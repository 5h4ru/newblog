import type { Paragraph, Text } from 'mdast'
import type { Handler, State } from 'mdast-util-to-hast'
import type unified from 'unified'
import type { Node, Parent } from 'unist'
import type { VFileCompatible } from 'vfile'
import conveter from './node-converter'
import type { createNewNodeType } from './node-converter'

const messageType = 'message'

type Message = Parent & {
  type: 'message'
  isAlert: boolean
}

const createNewNode: createNewNodeType = (node: Text, parent: Paragraph) => {
  const nodeText: string = node.value
  const newNode: Message = {
    ...parent,
    type: messageType,
    isAlert: nodeText.startsWith(':::message alert'),
  }
  return newNode
}

export const message: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    conveter(tree, 'message', ':::', createNewNode)
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
