import { renderHook } from 'utils/test-utils'
import { useWindow } from 'hooks'

describe('useWindow hook test', () => {
  it('should return window correct width', () => {
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    const { result } = renderHook(useWindow)
    expect(result.current.width).toEqual(200)
  })
})
