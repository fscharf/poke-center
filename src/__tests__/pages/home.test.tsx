import { Pokemon } from 'models/pokemon'
import { Home } from 'pages'
import * as store from 'store'
import { State } from 'store/pokemon'
import { render, screen } from 'utils/test-utils'

describe('Home page test', () => {
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
      pokemons: [pokemon],
      ...data
    })
  }

  it('should render correctly', () => {
    mockState()
    render(<Home />)
    expect(screen.getByText(/Party/)).toBeInTheDocument()
  })
})
