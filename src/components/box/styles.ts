import styled, { CSSObject } from 'styled-components'

export const Wrapper = styled.div<{ css?: CSSObject }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  background: #e5e5e5;
  border-radius: 16px;
  position: relative;
  min-height: 150px;
  height: 100%;

  @media screen and (max-width: 450px) {
    min-height: 100px;
  }

  ${props => props.css}
`

export const IconButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    opacity: 0.6;
  }

  @media screen and (max-width: 450px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`
