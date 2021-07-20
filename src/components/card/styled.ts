import styled from "styled-components";

interface Props {
  url?: string;
  rotated?: boolean;
}

export const StyledCard = styled.div`
  position: absolute;
  width: 150px;
  height: 200px;
  background-color: #bbdefb;
  display: block;
  justify-content: center;
  align-items: center;
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

  background-color: #bdbdbd;
  transform: rotateY(180deg);
`;

// ../../images/flower.jpg

// transform: rotateY(${({ rotated }) => (rotated ? 180 : 0)}deg);
export const StyledCardInner = styled.div<Props>`
  width: 300px;
  height: 300px;
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
  width: 100%;
`;
