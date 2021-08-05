import styled from "styled-components";

export const StyledMainCon = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 25% auto;
  position: relative;
  @media (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const StyledCardCon = styled.div`
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  position: absolute;
  top: 15%;
  right: 0;
  width: 75%;
  height: 55%;
  @media (max-width: 960px) {
    grid-template-columns: 100%;
    position: relative;
    top: 20px;
    width: 100%;
  }
`;
