import { PokemonList, PokemonParty, SearchBox } from 'components'
import { usePokemon } from 'contexts/pokemon'
import { Container, Content, Wrapper } from './styles'

export default function Home() {
  const { handleSearch } = usePokemon()

  return (
    <Wrapper>
      <Container>
        <SearchBox onChange={handleSearch} />
        <Content>
          <PokemonParty />
          <PokemonList />
        </Content>
      </Container>
    </Wrapper>
  )
}
