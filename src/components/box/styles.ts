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

  @media screen and (max-width: 450px) {
    min-height: 125px;
  }

  ${props => props.css}
`

export const IconButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  * {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.6;
  }
`
