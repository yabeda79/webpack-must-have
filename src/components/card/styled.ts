import styled from "styled-components";

interface Props {
  url?: string;
  rotated?: boolean;
}

export const StyledCard = styled.div`
  width: 150px;
  height: 150px;
  margin: 5px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;
// ../../images/flower.jpg
export const StyledCardInner = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(${({ rotated }) => (rotated ? 180 : 0)}deg);
  transition: transform 0.5s;
`;
// background-image: url(${({ url }) => url});
export const StyledCardImage = styled.div<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  backface-visibility: hidden;
  background-color: dodgerblue;
  transform: rotateY(180deg);
`;

export const StyledCardBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #bbb;
`;
