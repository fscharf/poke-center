import { PokemonProvider } from 'contexts/pokemon'
import React from 'react'
import { GlobalStyle } from 'theme'
import { Main } from './styles'

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <PokemonProvider>
      <GlobalStyle />

      <Main>{children}</Main>
    </PokemonProvider>
  )
}
