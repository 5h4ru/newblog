import type unified from 'unified'
import type { Node } from 'unist'
import { inspect } from 'unist-util-inspect'
import type { VFileCompatible } from 'vfile'

const print: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    console.log(inspect(tree))
  }
}

export default print
