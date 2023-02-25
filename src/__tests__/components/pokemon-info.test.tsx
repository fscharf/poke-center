import { PokemonInfo } from 'components'
import { render, screen } from 'utils/test-utils'

describe('PokemonInfo component test', () => {
  it('should render correctly', () => {
    render(<PokemonInfo name="Name" exp={200} imageUrl="/test.png" />)

    expect(screen.getByText(/Name/)).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument()
  })
})
