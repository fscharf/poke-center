import { PokemonParty } from 'components'
import { Pokemon } from 'models/pokemon'
import * as store from 'store'
import { State } from 'store/pokemon'
import { fireEvent, render, screen } from 'utils/test-utils'

describe('PokemonParty component test', () => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: jest.fn()
  })

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
      pickedPokemons: [pokemon],
      ...data
    })
  }

  it('should render correctly', () => {
    mockState()
    render(<PokemonParty />)
    expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })

  it('should delete specific pokemon from picks', async () => {
    const removePickedSpy = jest.spyOn(store.actions.pokemon, 'removePicked')
    render(<PokemonParty />)
    expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
    const button = screen.getByTestId('delete-pokemon-1')
    fireEvent.click(button)
    expect(removePickedSpy).toBeCalledTimes(1)
  })

  it('should change ui if window is below 425', () => {
    global.innerWidth = 420
    mockState()
    render(<PokemonParty />)
    expect(screen.getByText(/bulbasaur/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })
})
