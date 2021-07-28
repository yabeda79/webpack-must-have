import styled from "styled-components";

export const StyledFilterCon = styled.div`
  width: 90%;
  border-radius: 24px;
  background-color: #f0f8ff;
  margin: 5%;
  /* display: flex; */
  position: relative;
`;

export const StyledCatText = styled.p`
  font-size: 24px;
  margin: 5px;
  text-align: center;
  width: 30%;
  display: inline-block;
`;

export const StyledFilterName = styled.p`
  font-size: 20px;
  margin: 20px 0 5px 10%;
`;

export const StyledSortCon = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const StyledInsideText = styled.p`
  font-size: 16px;
  margin-left: 15%;
  display: flex;
  align-items: center;
`;
