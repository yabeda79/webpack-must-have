import styled from "styled-components";

export const StyledModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 90%;
  min-height: 90%;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 20px;
  z-index: 1101;
`;

export const StyledDividerText = styled.p`
  margin: 5px 20px;
  font-size: 24px;
  max-width: 500px;
`;

export const StyledGridCon = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 30% 1fr;
`;

export const StyledImgCon = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  position: relative;
  overflow: hidden;
  object-fit: cover;

  width: 90%;
  max-height: 55%;
`;

export const StyledImg = styled.img`
  /* width: 90%;
  height: 55%; */
  margin-top: 20px;
  border: 3px solid black;
  border-radius: 20px;
  overflow: hidden;
`;

export const StyledForm = styled.form`
  justify-self: center;
  margin-right: 15px;
`;

export const StyledSelectLabel = styled.p`
  grid-column-start: 2;
  margin: 5px;
`;
