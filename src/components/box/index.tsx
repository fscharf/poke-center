import { CSSObject } from 'styled-components'
import { IconButton, Wrapper } from './styles'

type BoxProps = {
  onClick?: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
  css?: CSSObject
  testId?: string
}

export default function Box({
  children,
  icon,
  onClick,
  css,
  testId
}: BoxProps) {
  return (
    <Wrapper css={css}>
      <IconButton onClick={onClick} data-testid={testId || 'icon-trigger'}>
        {icon}
      </IconButton>
      {children}
    </Wrapper>
  )
}
