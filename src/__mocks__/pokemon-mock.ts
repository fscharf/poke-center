import { PokemonContextType } from 'contexts/pokemon'

export const pokemonMock: PokemonContextType = {
  pokemons: [],
  handleNext: jest.fn(),
  handlePrevious: jest.fn(),
  addPicked: jest.fn(),
  handleSearch: jest.fn(),
  removePicked: jest.fn(),
  currentPage: 1,
  pickedPokemons: [],
  notFound: false,
  isLoading: false,
  isPickedFull: false
}
