import { useColorMode } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

type Props = {
  name: string
  id: string
  theme: 'light' | 'dark'
}

export const Tweet = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const name = props.name
  const id = props.id
  const { colorMode } = useColorMode()
  const theme = colorMode

  useEffect(() => {
    // @ts-expect-error widgets.js
    window.twttr?.widgets.load(ref.current)
  }, [id, name, theme])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: GenTweetCode({ name, id, theme }),
      }}
      ref={ref}
      key={JSON.stringify(props)}
    />
  )
}

const GenTweetCode = (props: Props) => {
  return `<blockquote class="twitter-tweet" data-lang="ja" data-theme="${props.theme}">
      <a target="_blank" rel="noreferrer noopener" href="https://twitter.com/${props.name}/status/${props.id}">
        A tweet form @${props.name}
      </a>
    </blockquote>`
}
