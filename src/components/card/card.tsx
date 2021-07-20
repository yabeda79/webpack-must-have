import { FC } from "react";
import { StyledCard, StyledCardFg, StyledCardInner, StyledCardBg, StyledImage } from "./styled";

interface CardProp {
  url?: any;
  // rotated?: boolean;
  // onClick?: (e: React.MouseEvent) => void;
}

const Card: FC<CardProp> = ({ url }) => {
  console.log(url.image);

  return (
    <StyledCard>
      <StyledCardInner>
        <StyledCardBg />
        <StyledCardFg url={url}>
          <StyledImage src={url.image} alt="as" />
        </StyledCardFg>
      </StyledCardInner>
    </StyledCard>
  );
};

export default Card;
