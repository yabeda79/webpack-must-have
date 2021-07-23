import { FC } from "react";

import StarIcon from "@material-ui/icons/Star";
import { makeStyles, createStyles, createTheme, Theme } from "@material-ui/core/styles";
import { StyledCard, StyledCardFg, StyledCardInner, StyledCardBg, StyledImage, StyledGameName } from "./styled";

interface CardProp {
  game: {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    manufacturer: string;
    price: string;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    star_color: {
      color: "#ffeb3b",
    },
    star_con: {
      position: "absolute",
      top: "30px",
      left: "5px",
    },
    game_title: {
      color: "white",
      position: "absolute",
      top: "5px",
      left: "10px",
      fontWeight: "bold",
      margin: "0",
      padding: "0",
    },
    game_price: {
      color: "white",
      position: "absolute",
      top: "5px",
      right: "10px",
      fontWeight: "bold",
      margin: "0",
      padding: "0",
    },
  })
);

const Card: FC<CardProp> = ({ game }) => {
  const classes = useStyles();

  const { id, title, category, description, image, manufacturer, price } = game;

  const alertHandler = () => {
    alert("got it");
  };

  return (
    <StyledCard onClick={alertHandler}>
      <StyledCardInner>
        <StyledCardBg>
          <p>{description}</p>
        </StyledCardBg>
        <StyledCardFg>
          <StyledImage src={game.image} alt="as" />
          <StyledGameName>
            <p className={classes.game_title}>{title}</p>
            <p className={classes.game_price}>{price} RUB</p>
            <div className={classes.star_con}>
              <StarIcon className={classes.star_color} />
              <StarIcon className={classes.star_color} />
              <StarIcon className={classes.star_color} />
              <StarIcon className={classes.star_color} />
              <StarIcon className={classes.star_color} />
            </div>
          </StyledGameName>
        </StyledCardFg>
      </StyledCardInner>
    </StyledCard>
  );
};

export default Card;
