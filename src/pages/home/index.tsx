import { PokemonList, PokemonParty, SearchBox } from 'components'
import { useAppDispatch, thunks } from 'store'
import { Container, Content, Wrapper } from './styles'

export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <Container>
        <SearchBox onChange={value => dispatch(thunks.pokemon.search(value))} />
        <Content>
          <PokemonParty />
          <PokemonList />
        </Content>
      </Container>
    </Wrapper>
  )
}
