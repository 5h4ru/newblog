import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import parser from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"
import print from "../plugins/transformers/print"
import details from "../plugins/transformers/zenn-details"

const postsDirectory = path.join(process.cwd(), "contents")

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsdata = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as { date: string, title: string }),
    }
  })

  return allPostsdata.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(parser)
    .use(remarkGfm)
    .use(details)
    .use(print)
    .use(remarkHtml, { sanitize: false })
    .process(matterResult.content)
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string, title: string }),
  }
}