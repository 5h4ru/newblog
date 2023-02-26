import type { Node, Parent } from 'unist'

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
