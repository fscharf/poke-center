import React from 'react'
import { GlobalStyle } from 'theme'
import { Main } from './styles'

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <>
      <GlobalStyle />

      <Main>{children}</Main>
    </>
  )
}
