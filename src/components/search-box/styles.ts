import styled, { CSSObject } from 'styled-components'

export const InputWrapper = styled.div<{ css?: CSSObject }>`
  display: flex;
  gap: 8px;
  align-items: center;
  background: #e5e5e5;
  width: 100%;
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 3px 15px rgba(70, 70, 70, 0.4);

  ${props => props.css}
`

export const Button = styled.button`
  align-self: flex-end;
  height: 24px;
`

export const Input = styled.input`
  width: 100%;
`

export const Svg = styled.svg`
  width: 16px;
  height: 16px;
`
