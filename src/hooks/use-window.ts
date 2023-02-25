import { useEffect, useState } from 'react'

export const useWindow = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  return { width }
}
