import { useStorage } from 'hooks'
import { renderHook } from 'utils/test-utils'

describe('useStorage hook test', () => {
  it('should storage item by it state correctly', () => {
    const { result } = renderHook(() => useStorage('test', 'test-value'))

    expect(result.current[0]).toEqual('test-value')
  })
})
