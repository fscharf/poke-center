import { Box, PokemonInfo } from 'components'
import { Trash } from 'components/icons'
import { useWindow } from 'hooks'
import { useEffect, useRef } from 'react'
import { actions, useAppDispatch, useAppSelector } from 'store'
import { Counter, PartyHeader, PartyWrapper, Wrapper } from './styles'

export default function PokemonParty() {
  const { pickedPokemons } = useAppSelector(state => state.pokemon)
  const { width } = useWindow()
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight)
    }
  }, [pickedPokemons])

  return (
    <Wrapper>
      <PartyHeader>
        <h2>Party</h2> <Counter>{pickedPokemons.length}/6</Counter>
      </PartyHeader>
      <PartyWrapper ref={ref}>
        {pickedPokemons.map(pokemon => {
          return (
            <Box
              key={pokemon.id}
              testId={`delete-pokemon-${pokemon.id}`}
              css={{
                justifyContent: width <= 425 ? 'center' : 'initial',
                border: '8px double #3894fd',
                height: 'max-content',
                gap: '8px',
                flexDirection: width <= 425 ? 'column' : 'initial',
                textAlign: width <= 425 ? 'center' : 'initial'
              }}
              onClick={() => dispatch(actions.pokemon.removePicked(pokemon.id))}
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
