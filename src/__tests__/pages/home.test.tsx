import { Home } from 'pages'
import { render, screen } from 'utils/test-utils'
import * as context from 'contexts/pokemon'
import { pokemonMock } from '__mocks__/pokemon-mock'

describe('Home page test', () => {
  jest.spyOn(context, 'usePokemon').mockImplementation(() => pokemonMock)

  it('should render correctly', () => {
    render(<Home />)
    expect(screen.getByText(/Party/)).toBeInTheDocument()
  })
})
