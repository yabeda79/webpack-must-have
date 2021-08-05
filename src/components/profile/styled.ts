import styled from "styled-components";

export const StyledDividerText = styled.p`
  margin: 5px 20px;
  font-size: 24px;
`;

export const StyledProfCon = styled.div`
  margin-top: 40px;
  min-height: 70vh;
  min-width: 80vw;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const StyledImgCon = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const StyledImg = styled.img`
  width: 90%;
  height: 55%;
  margin-top: 20px;
  border: 3px solid black;
  border-radius: 20px;
`;

export const StyledButton = styled.button`
  width: 90%;
  height: 50px;
  margin-top: 20px;
  position: absolute;
  top: 60%;
  border: 2px solid transparent;
  border-radius: 15px;
  background-color: #d3d3d3;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    border: 2px solid #b83567;
  }
`;

export const StyledFormCon = styled.div`
  min-width: 60%;
  display: flex;
  justify-self: center;
  grid-column-start: 2;
  @media (max-width: 960px) {
    grid-column-start: 1;
  }
`;

export const StyledForm = styled.form`
  justify-self: center;
`;

export const StyledBtnCon = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const StyledChangeButton = styled.button`
  width: 90%;
  height: 50px;
  margin-top: 20px;
  border: 2px solid transparent;
  border-radius: 15px;
  background-color: #d3d3d3;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    border: 2px solid #b83567;
  }
`;
