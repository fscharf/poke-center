import React, { useCallback, useEffect, useState } from 'react'
import { CSSObject } from 'styled-components'
import { Button, Input, InputWrapper, Svg } from './styles'

type SearchBoxProps = {
  onChange: (value: string) => void
  css?: CSSObject
}

export default function SearchBox({ onChange, css }: SearchBoxProps) {
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setValue(event.target.value)
    },
    [value]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <InputWrapper data-testid="search-box" css={css}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </Svg>

      <Input
        data-testid="search-box-input"
        type="text"
        value={value}
        placeholder="Search..."
        onChange={handleChange}
      />

      {value ? (
        <Button data-testid="search-box-clear" onClick={() => setValue('')}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </Svg>
        </Button>
      ) : null}
    </InputWrapper>
  )
}
