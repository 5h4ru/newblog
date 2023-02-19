import unified from "unified"
import { inspect } from "unist-util-inspect"
import { Node } from "unist"
import { VFileCompatible } from "vfile"

const print: unified.Plugin = () => {
    return (tree: Node, file: VFileCompatible) => {
        console.log(inspect(tree))
    }
}

export default print