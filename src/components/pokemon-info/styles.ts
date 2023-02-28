import styled, { CSSObject } from 'styled-components'

export const Img = styled.img`
  width: 75px;
  height: 75px;

  @media screen and (max-width: 450px) {
    width: 50px;
    height: 50px;
  }
`
export const Label = styled.h4`
  font-weight: 700;
  text-transform: capitalize;
`

export const Exp = styled.span`
  text-transform: uppercase;
  font-size: 0.6em;
  font-family: monospace;
`

export const InfoWrapper = styled.div<{ css?: CSSObject }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${props => props.css}
`
