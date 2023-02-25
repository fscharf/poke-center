import { PokemonProvider } from 'contexts/pokemon'
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { renderHook, act } from '@testing-library/react-hooks'

const wrapper = ({ children }: React.PropsWithChildren) => {
  return <PokemonProvider>{children}</PokemonProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper, ...options })

// function customRenderHook<T>(hook: any) {
//   return renderHook<any, T>(hook, { wrapper })
// }

export * from '@testing-library/react'
export { customRender as render, renderHook, act as hookAct }
