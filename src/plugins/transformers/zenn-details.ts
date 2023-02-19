import unified from "unified"
import { Node, Parent } from "unist"
import {Paragraph, Text} from "mdast"
import { VFileCompatible } from "vfile"
import { visit , SKIP} from "unist-util-visit"
import {is} from "unist-util-is"

const PREFIX = /^:::details\s*(.*)$/m
const SUFFIX_SINGLE = /\n:::$/m
const SUFFIX_MULTIPLE = /^:::$/m

type DetailsNode = {
  type: "details",
  title: String,
  children: Array<Node>
}

const getTitle = (value: String) => {
  const m = value.match(PREFIX)
  return m?.[1]
}

const single_node = (node: Paragraph, index: number, parent: Parent, title: String) => {
  // 1. 自身の type を直接 details に置き換える
  const children = [...node.children] as Array<Text>
  
  parent.children[index].type = "details"
  parent.children[index].title = title
    
  // 2. 一番最初の text の頭に `:::detail title\n` が入っているのでこれを消す
  const paragraph_first_text = children[0].value
  let m = paragraph_first_text.match(PREFIX)
  children[0].value = paragraph_first_text.slice(m?.[0].length + 1)
  
  // 3. 一番最後の text の末尾に `\n:::` が入っているのでこれを消す
  const paragraph_tail_text = children[children.length - 1].value
  m = paragraph_tail_text.match(SUFFIX_MULTIPLE)
  children[children.length - 1].value = paragraph_tail_text.slice(0, paragraph_tail_text.length -  m?.[0].length -1)
}

const multiple_node = (node: Paragraph, index: number, parent: Parent, title: String) => {
  // 対応する paragraph を探す
  let end_index = parent.children.findIndex( ( sibling  , i)=> {
    if (!is(sibling, "paragraph")) return false
    if (i <= index) return false
    const sibling_chilren = (sibling as Paragraph).children[0] as Text
    if (SUFFIX_MULTIPLE.test(sibling_chilren.value)) return true
  })

  // 見つからなかったら帰る
  if (end_index < 0) return SKIP
  
  let inner = []
  for (let i = index + 1; i < end_index; i++) {
    inner.push(parent.children[i])
  } 

  // 間のノードを削除
  parent.children.splice(index + 1, inner.length+1)

  // 自作 details ノードに置き換える
  parent.children[index] = {
    type: "details",
    title: title,
    children: inner,
  } as DetailsNode

  // return end_index + 1
}

const visitor = (node: Paragraph, index: number, parent: Parent | undefined) => {
  const children = [...node.children] as Array<Text>
  // 以下の 2 つは一致する場合もある
  const paragraph_first_text = children[0].value
  const paragraph_tail_text = children[children.length - 1].value

  if(!parent) return SKIP

  // 文頭にマッチしていない
  if (!PREFIX.test(paragraph_first_text))
    return SKIP

  let title = getTitle(paragraph_first_text)
  if (!title) title = ""

  // 文末にマッチしたら 1 つの paragraph ノード
  if (SUFFIX_SINGLE.test(paragraph_tail_text))
    return single_node(node,index,parent, title)
  // そうでなければ複数行あるよ（笑）
  else
    return multiple_node(node,index,parent, title)
}

const details: unified.Plugin = () =>{
    return (tree: Node, file: VFileCompatible) => {
        visit(tree, "paragraph", visitor)
    }
}

export default details