import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: 'Anek Latin', 'Segoe UI', sans-serif;
    font-size: unset;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  body {
    font-size: 18px;
    color: #333333;
    background: url(/pokemon-bg.svg) no-repeat;
    overflow: hidden;
    background-size: cover;
    background-attachment: fixed;
  }
  button {
    cursor: pointer;
  }
  button, input {
    background: transparent;
    outline: none;
    border: none;
  }
`
