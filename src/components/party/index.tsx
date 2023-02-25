import { usePokemon } from 'contexts/pokemon'
import { useWindow } from 'hooks'
import { Trash } from 'components/icons'
import { Box, PokemonInfo } from 'components'
import { Counter, PartyHeader, PartyWrapper, Wrapper } from './styles'

export default function Party() {
  const { pickedPokemons, removePicked } = usePokemon()
  const { width } = useWindow()

  return (
    <Wrapper>
      <PartyHeader>
        <h2>Party</h2> <Counter>{pickedPokemons.length}/6</Counter>
      </PartyHeader>
      <PartyWrapper>
        {pickedPokemons.map(pokemon => {
          return (
            <Box
              key={pokemon.id}
              testId={`delete-pokemon-${pokemon.id}`}
              css={{
                justifyContent: width <= 425 ? 'center' : 'initial',
                border: '8px double #3894fd',
                height: 'max-content',
                flexDirection: width <= 425 ? 'column' : 'initial',
                textAlign: width <= 425 ? 'center' : 'initial'
              }}
              onClick={() => removePicked(pokemon.id)}
              icon={<Trash />}
            >
              <PokemonInfo
                name={pokemon.name}
                imageUrl={pokemon.sprites.front_default}
                exp={pokemon.base_experience}
              />
            </Box>
          )
        })}
      </PartyWrapper>
    </Wrapper>
  )
}
