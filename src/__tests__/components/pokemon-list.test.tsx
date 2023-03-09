import { PokemonList } from 'components'
import { Pokemon } from 'models/pokemon'
import * as store from 'store'
import { State } from 'store/pokemon'
import { fireEvent, render, screen } from 'utils/test-utils'

describe('PokemonList component test', () => {
  beforeEach(jest.clearAllMocks)

  const pokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    base_experience: 200,
    sprites: { front_default: 'test.png' }
  }

  jest.spyOn(store, 'useAppDispatch').mockReturnValue(jest.fn())
  const state = store.default.getState().pokemon

  const mockState = (data?: Partial<State>) => {
    jest.spyOn(store.selectors.pokemon, 'getState').mockReturnValue({
      ...state,
      pokemons: [pokemon],
      ...data
    })
  }

  it('should render correctly', async () => {
    mockState()
    render(<PokemonList />)
    expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })
  it('should show not found label if no results found in search box', () => {
    mockState({ isNotFound: true })
    render(<PokemonList />)
    expect(screen.getByText(/Nothing was found :\(/)).toBeInTheDocument()
    expect(screen.getByText(/Back to list/)).toBeInTheDocument()
  })
  it('should return to list by clicking on button if no results found', () => {
    const searchSpy = jest.spyOn(store.thunks.pokemon, 'search')
    mockState({ isNotFound: true })
    render(<PokemonList />)
    const button = screen.getByText(/Back to list/)
    fireEvent.click(button)
    expect(searchSpy).toBeCalledTimes(1)
  })
  it('should go to next page', () => {
    const getPokemonsSpy = jest.spyOn(store.thunks.pokemon, 'getPokemons')
    mockState({ next: 'next.url' })
    render(<PokemonList />)
    const button = screen.getByTestId('next-page')
    fireEvent.click(button)
    expect(getPokemonsSpy).toBeCalledWith({ url: 'next.url' })
  })
  it('should go to previous page if currentPage is more than 1', () => {
    const getPokemonsSpy = jest.spyOn(store.thunks.pokemon, 'getPokemons')
    mockState({ previous: 'previous.url', currentPage: 2 })
    render(<PokemonList />)
    const button = screen.getByTestId('previous-page')
    fireEvent.click(button)
    expect(getPokemonsSpy).toBeCalledWith({ url: 'previous.url' })
  })
  it('should load skeleton before fetching is done', () => {
    mockState({ isLoading: true })
    render(<PokemonList />)
    expect(screen.queryByText(/bulbasaur/)).not.toBeInTheDocument()
    expect(screen.queryByText(/200/)).not.toBeInTheDocument()
  })
  it('should show an empty box if the pokemon has picked', () => {
    mockState({
      pickedPokemons: [pokemon]
    })
    render(<PokemonList />)
    expect(screen.getByTestId('empty-box')).toBeInTheDocument()
  })
  it('should add a pokemon to picked list', () => {
    const addPickedSpy = jest.spyOn(store.actions.pokemon, 'addPicked')
    mockState()
    render(<PokemonList />)
    const button = screen.getByTestId('add-pokemon')
    fireEvent.click(button)
    expect(addPickedSpy).toBeCalledTimes(1)
  })
  it('should not add new picks if picked list is full', () => {
    mockState({
      pickedPokemons: Array.from({ length: 6 }).map(() => pokemon)
    })
    render(<PokemonList />)
    const button = screen.queryByTestId('add-pokemon')
    expect(button).not.toBeInTheDocument()
  })
})
