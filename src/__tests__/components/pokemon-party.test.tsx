import { PokemonParty } from 'components'
import * as context from 'contexts/pokemon'
import { Pokemon } from 'services/pokemon'
import { fireEvent, render, screen } from 'utils/test-utils'
import { pokemonMock } from '__mocks__/pokemon-mock'

describe('PokemonParty component test', () => {
  beforeEach(jest.clearAllMocks)

  const pokemon: Pokemon = {
    id: 1,
    name: 'Pokemon test',
    base_experience: 200,
    sprites: { front_default: 'test.png' }
  }

  const mockContext = (data?: Partial<typeof pokemonMock>) => {
    jest.spyOn(context, 'usePokemon').mockImplementation(() => ({
      ...pokemonMock,
      pickedPokemons: [pokemon],
      ...data
    }))
  }

  it('should render correctly', () => {
    mockContext()

    render(<PokemonParty />)

    expect(screen.getByText(/Pokemon test/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })

  it('should delete specific pokemon from picks', async () => {
    const removePickedSpy = jest.fn()
    mockContext({ removePicked: removePickedSpy })

    render(<PokemonParty />)

    expect(screen.getByText(/Pokemon test/)).toBeInTheDocument()

    const trigger = screen.getByTestId('delete-pokemon-1')
    fireEvent.click(trigger)

    expect(removePickedSpy).toBeCalledTimes(1)
  })

  it('should change ui if window is below 425', () => {
    global.innerWidth = 420
    mockContext()

    render(<PokemonParty />)

    expect(screen.getByText(/Pokemon test/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })
})
