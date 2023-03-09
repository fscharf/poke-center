import { PageWrapper } from 'components'
import { render, screen } from 'utils/test-utils'

describe('PageWrapper component test', () => {
  it('should render correctly', () => {
    render(<PageWrapper>Text</PageWrapper>)
    expect(screen.getByText(/Text/)).toBeInTheDocument()
  })
})
