import { Box, PokemonInfo } from 'components'
import {
  AddCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'components/icons'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import {
  actions,
  selectors,
  thunks,
  useAppDispatch,
  useAppSelector
} from 'store'
import {
  BackToListButton,
  BoxHeader,
  BoxWrapper,
  Button,
  NotFoundLabel,
  Wrapper
} from './styles'

export default function PokemonList() {
  const dispatch = useAppDispatch()

  const {
    pokemons,
    isLoading,
    previous,
    next,
    currentPage,
    pickedPokemons,
    isNotFound
  } = useAppSelector(state => state.pokemon)

  useEffect(() => {
    dispatch(thunks.pokemon.getPokemons())
  }, [])

  const isPickedFull = useAppSelector(selectors.pokemon.isPickedFull)
  const handlePage = (url: string) =>
    dispatch(thunks.pokemon.getPokemons({ url }))

  return (
    <Wrapper>
      <BoxHeader>
        <Button
          data-testid="previous-page"
          onClick={() => handlePage(previous)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <h2>Box {currentPage}</h2>
        <Button data-testid="next-page" onClick={() => handlePage(next)}>
          <ChevronRight />
        </Button>
      </BoxHeader>
      {isNotFound ? (
        <NotFoundLabel>
          <span>Nothing was found :(</span>
          <BackToListButton onClick={() => dispatch(thunks.pokemon.search())}>
            <ArrowLeft />
            Back to list
          </BackToListButton>
        </NotFoundLabel>
      ) : (
        <BoxWrapper>
          {pokemons.map(pokemon => {
            const isPicked = pickedPokemons.some(
              picked => picked.id === pokemon.id
            )

            return isLoading ? (
              <Skeleton key={Math.random()} height="100%" borderRadius="16px" />
            ) : isPicked ? (
              <Box key={Math.random()} testId="empty-box"></Box>
            ) : (
              <Box
                testId="add-pokemon"
                css={{ flexDirection: 'column' }}
                key={pokemon.id}
                onClick={() => dispatch(actions.pokemon.addPicked(pokemon))}
                icon={isPickedFull ? null : <AddCircle />}
              >
                <PokemonInfo
                  name={pokemon.name}
                  imageUrl={pokemon.sprites?.front_default}
                  exp={pokemon.base_experience}
                  css={{ alignItems: 'center' }}
                />
              </Box>
            )
          })}
        </BoxWrapper>
      )}
    </Wrapper>
  )
}
