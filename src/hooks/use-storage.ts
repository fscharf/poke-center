import React, { useEffect, useState } from 'react'

type Response<Type> = [Type, React.Dispatch<React.SetStateAction<Type>>]

export const useStorage = <Type>(
  key: string,
  initialState?: Type
): Response<Type> => {
  const getStorage = () => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : initialState
  }

  const [state, setState] = useState(getStorage)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
