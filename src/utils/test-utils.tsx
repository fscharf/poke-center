import '@testing-library/jest-dom/extend-expect'
import { render, RenderOptions } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'store'

const wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render, renderHook, act as hookAct }
