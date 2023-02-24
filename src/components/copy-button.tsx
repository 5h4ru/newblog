import { Button, useClipboard, ButtonProps } from '@chakra-ui/react'

type CopyButtonProps = ButtonProps & {
  code: string
}

const CopyButton = ({ code, ...props }: CopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(code)
  return (
    <Button
      size="sm"
      position="absolute"
      display="block"
      height="24px"
      colorScheme="blue"
      top={0}
      right={0}
      zIndex="1"
      {...props}
      onClick={onCopy}
    >
      {hasCopied ? 'Copied!' : 'Copy'}
    </Button>
  )
}

export default CopyButton
