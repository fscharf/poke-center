import { usePokemon } from 'contexts/pokemon'
import Skeleton from 'react-loading-skeleton'
import {
  AddCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'components/icons'
import { Box, PokemonInfo } from 'components'
import {
  BackToListButton,
  BoxHeader,
  BoxWrapper,
  Button,
  NotFoundLabel,
  Wrapper
} from './styles'

export default function PokemonList() {
  const {
    pokemons,
    handleNext,
    handlePrevious,
    currentPage,
    addPicked,
    pickedPokemons,
    handleSearch,
    notFound,
    isLoading,
    isPickedFull
  } = usePokemon()

  return (
    <Wrapper>
      <BoxHeader>
        <Button
          data-testid="previous-page"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <h2>Box {currentPage}</h2>
        <Button data-testid="next-page" onClick={handleNext}>
          <ChevronRight />
        </Button>
      </BoxHeader>
      {notFound ? (
        <NotFoundLabel>
          <span>Nothing was found :(</span>
          <BackToListButton onClick={() => handleSearch('')}>
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
                onClick={() => addPicked(pokemon)}
                icon={isPickedFull ? null : <AddCircle />}
              >
                <PokemonInfo
                  name={pokemon.name}
                  imageUrl={pokemon.sprites.front_default}
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
