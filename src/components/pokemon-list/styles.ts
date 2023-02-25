import styled from 'styled-components'

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 3;

  @media screen and (max-width: 450px) {
    flex: 2;
    font-size: 0.8em;
  }
`

export const BoxHeader = styled.header`
  padding: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 3px 15px rgba(70, 70, 70, 0.4);
`

export const BoxWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  padding: 16px 0;
  height: 75vh;
  overflow-y: auto;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`

export const Button = styled.button`
  display: flex;

  &:hover {
    opacity: 0.6;

    &:disabled {
      background: none;
      cursor: default;
    }
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export const NotFoundLabel = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  color: #e5e5e5;
  font-weight: 700;
  font-size: 1.8em;
`

export const BackToListButton = styled.button`
  background: #e5e5e5;
  padding: 16px;
  border-radius: 16px;
  font-weight: 500;
  font-size: 0.6em;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    box-shadow: 0 3px 15px rgba(70, 70, 70, 0.4);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`
