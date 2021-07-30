import styled from "styled-components";

interface Props {
  url?: string;
  rotated?: boolean;
}

export const StyledCard = styled.div`
  position: relative;
  width: 250px;
  height: 350px;
  background-color: #fff; //#e8e8f0
  display: block;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

// background-image: url(${({ url }) => url});
export const StyledCardFg = styled.div<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
  backface-visibility: hidden;

  border: 2px solid #b83567;
  overflow: hidden;

  border-radius: 10px;

  background-color: #fff;
`;

export const StyledCardBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
  backface-visibility: hidden;
  border-radius: 10px;

  border: 2px solid #b83567;

  background-color: #bdbdbd;
  transform: rotateY(180deg);
`;

// ../../images/flower.jpg

// transform: rotateY(${({ rotated }) => (rotated ? 180 : 0)}deg);
export const StyledCardInner = styled.div<Props>`
  width: 250px;
  height: 350px;
  position: relative;
  perspective: 1000px;
  &:hover ${StyledCardFg} {
    transform: rotateY(180deg);
  }
  &:hover ${StyledCardBg} {
    transform: rotateY(360deg);
  }
`;

export const StyledImage = styled.img`
  /* width: 100%; */
  height: 100%;
  /* opacity: 0.4; */
`;

export const StyledGameName = styled.div`
  height: 25%;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;
`;
