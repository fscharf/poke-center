import { PokemonList, Party, SearchBox } from 'components'
import { usePokemon } from 'contexts/pokemon'
import { useWindow } from 'hooks'
import styled from 'styled-components'
import { Container, Content, Wrapper } from './styles'

export default function Home() {
  const { handleSearch } = usePokemon()
  const { width } = useWindow()

  return (
    <Wrapper>
      <Container>
        <Content>
          <Party />
          <PokemonList />
        </Content>
        <SearchBox
          onChange={handleSearch}
          css={
            width >= 768
              ? { position: 'absolute', bottom: '24px', maxWidth: '1200px' }
              : {}
          }
        />
      </Container>
    </Wrapper>
  )
}
