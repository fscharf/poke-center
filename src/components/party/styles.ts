import styled from 'styled-components'

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  @media screen and (max-width: 450px) {
    flex: 2;
    font-size: 0.8em;
  }
`

export const PartyHeader = styled.header`
  padding: 24px;
  background: #e5e5e5;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 3px 15px rgba(70, 70, 70, 0.4);
`

export const Counter = styled.span`
  font-weight: 500;
  color: #6d6d6d;
`

export const PartyWrapper = styled.section`
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`
