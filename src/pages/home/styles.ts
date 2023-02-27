import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    position: relative;
    height: 100vh;
  }
`

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  @media screen and (max-width: 450px) {
    flex-direction: column-reverse;
  }
`

export const Content = styled.section`
  display: flex;
  gap: 16px;
`
