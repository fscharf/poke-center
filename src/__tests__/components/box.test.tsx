import { render, screen, fireEvent } from 'utils/test-utils'
import { Box } from 'components'

describe('Box component test', () => {
  it('should render correctly', () => {
    render(<Box>Text</Box>)
    expect(screen.getByText(/Text/)).toBeInTheDocument()
  })
  it('should call onClick event correctly', () => {
    const onClickSpy = jest.fn()
    render(
      <Box onClick={onClickSpy} icon={<div>Click me</div>}>
        Text
      </Box>
    )
    const icon = screen.getByTestId('icon-trigger')
    fireEvent.click(icon)
    expect(onClickSpy).toBeCalledTimes(1)
  })
})
