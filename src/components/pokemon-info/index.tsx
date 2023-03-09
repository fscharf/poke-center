import { CSSObject } from 'styled-components'
import { Exp, Img, InfoWrapper, Label } from './styles'

type PokemonInfoProps = {
  name: string
  exp: number
  imageUrl: string
  css?: CSSObject
}

export default function PokemonInfo({
  name,
  exp,
  imageUrl,
  css
}: PokemonInfoProps) {
  return (
    <>
      <Img src={imageUrl} alt={name} data-testid="pokemon-image" />
      <InfoWrapper css={css}>
        <Label>{name}</Label>
        <Exp>EXP: {exp}</Exp>
      </InfoWrapper>
    </>
  )
}
