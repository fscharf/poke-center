import { render, screen, fireEvent, waitFor } from 'utils/test-utils'
import { SearchBox } from 'components'

describe('SearchBox component test', () => {
  jest.useFakeTimers()
  beforeEach(jest.clearAllMocks)

  it('should render correctly', () => {
    render(<SearchBox onChange={jest.fn()} />)
    expect(screen.getByTestId('search-box')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Search.../)).toBeInTheDocument()
  })
  it('should trigger onChange event if some value is provided', async () => {
    const onChangeSpy = jest.fn()
    render(<SearchBox onChange={onChangeSpy} />)
    const input = screen.getByTestId('search-box-input')
    fireEvent.change(input, { target: { value: 'Testing' } })
    await waitFor(
      () => {
        expect(onChangeSpy).toBeCalled()
      },
      { timeout: 1000 }
    )
  })
  it('should show clear button and clear value when clicked', async () => {
    const onChangeSpy = jest.fn()
    render(<SearchBox onChange={onChangeSpy} />)
    const input: HTMLInputElement = screen.getByTestId('search-box-input')
    fireEvent.change(input, { target: { value: 'Testing' } })
    fireEvent.click(screen.getByTestId('search-box-clear'))
    expect(input.value).toEqual('')
  })
})
