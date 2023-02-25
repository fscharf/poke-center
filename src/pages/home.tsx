import { PokemonList, Party, SearchBox } from 'components'
import { usePokemon } from 'contexts/pokemon'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 450px) {
    flex-direction: column-reverse;
  }
`

const Content = styled.section`
  display: flex;
  gap: 16px;
`

export default function Home() {
  const { handleSearch } = usePokemon()

  return (
    <Wrapper>
      <Container>
        <Content>
          <Party />
          <PokemonList />
        </Content>
        <SearchBox onChange={handleSearch} />
      </Container>
    </Wrapper>
  )
}
