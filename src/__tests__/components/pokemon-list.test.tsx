import { PokemonList } from 'components'
import * as context from 'contexts/pokemon'
import { Pokemon } from 'services/pokemon'
import { fireEvent, render, screen, waitFor } from 'utils/test-utils'
import { pokemonMock } from '__mocks__/pokemon-mock'

describe('PokemonList component test', () => {
  beforeEach(jest.clearAllMocks)

  const pokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    base_experience: 200,
    sprites: { front_default: 'test.png' }
  }

  const mockContext = (data?: Partial<typeof pokemonMock>) => {
    jest.spyOn(context, 'usePokemon').mockImplementation(() => ({
      ...pokemonMock,
      pokemons: [pokemon],
      ...data
    }))
  }

  it('should render correctly', async () => {
    mockContext()

    render(<PokemonList />)

    expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })
  it('should show not found label if no results found in search box', () => {
    mockContext({ notFound: true })

    render(<PokemonList />)

    expect(screen.getByText(/Nothing was found :\(/)).toBeInTheDocument()
    expect(screen.getByText(/Back to list/)).toBeInTheDocument()
  })
  it('should return to list by clicking on button if no results found', () => {
    const handleSearchSpy = jest.fn()

    mockContext({ notFound: true, handleSearch: handleSearchSpy })

    render(<PokemonList />)

    const button = screen.getByText(/Back to list/)
    fireEvent.click(button)

    expect(handleSearchSpy).toBeCalledWith('')
  })
  it('should go to next page', () => {
    const handleNextSpy = jest.fn()

    mockContext({ handleNext: handleNextSpy })

    render(<PokemonList />)

    const button = screen.getByTestId('next-page')
    fireEvent.click(button)

    expect(handleNextSpy).toBeCalledTimes(1)
  })
  it('should go to previous page if currentPage is more than 1', () => {
    const handlePreviousSpy = jest.fn()

    mockContext({
      handlePrevious: handlePreviousSpy,
      currentPage: 2
    })

    render(<PokemonList />)

    const previousButton = screen.getByTestId('previous-page')
    fireEvent.click(previousButton)

    expect(handlePreviousSpy).toBeCalledTimes(1)
  })
  it('should load skeleton before fetching is done', () => {
    mockContext({
      isLoading: true
    })

    render(<PokemonList />)

    expect(screen.queryByText(/bulbasaur/)).not.toBeInTheDocument()
    expect(screen.queryByText(/200/)).not.toBeInTheDocument()
  })
  it('should show an empty box if the pokemon has picked', () => {
    mockContext({
      pickedPokemons: [pokemon]
    })

    render(<PokemonList />)

    expect(screen.getByTestId('empty-box')).toBeInTheDocument()
  })
  it('should add a pokemon to picked list', () => {
    const addPickedSpy = jest.fn()

    mockContext({
      addPicked: addPickedSpy
    })

    render(<PokemonList />)

    const trigger = screen.getByTestId('add-pokemon')
    fireEvent.click(trigger)

    expect(addPickedSpy).toBeCalledTimes(1)
  })
  it('should not add new picks if picked list is full', () => {
    const addPickedSpy = jest.fn()

    mockContext({
      isPickedFull: true
    })

    render(<PokemonList />)

    const trigger = screen.getByTestId('add-pokemon')
    fireEvent.click(trigger)

    expect(addPickedSpy).not.toBeCalled()
  })
})
