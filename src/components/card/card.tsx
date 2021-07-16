import { FC } from "react";
import { StyledCard, StyledCardImage, StyledCardInner, StyledCardBg } from "./styled";

interface CardProp {
  url?: any;
  rotated?: boolean;
  onClick?: (value: any) => void;
}

const Card: FC<CardProp> = ({ url, rotated, onClick }) => {
  console.log(rotated);
  console.log(url);

  return (
    <StyledCard onClick={() => onClick}>
      <StyledCardInner rotated={rotated}>
        <StyledCardBg />
        <StyledCardImage rotated={rotated} url={url} />
      </StyledCardInner>
    </StyledCard>
  );
};

export default Card;
