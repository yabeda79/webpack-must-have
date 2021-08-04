import { FC } from "react";

// eslint-disable-next-line import/no-cycle
import { IGame } from "@/main";

import StarIcon from "@material-ui/icons/Star";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { StyledCard, StyledCardFg, StyledCardInner, StyledCardBg, StyledImage, StyledGameName } from "./styled";

interface CardProp {
  game: IGame;
  addToCartHandler: (value: number) => void;
  editGameHandler: (value: number) => void;
  createGameHandler: () => void;
}

const useStyles = makeStyles(() =>
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
    cart_btn: {
      minWidth: "140px",
      backgroundColor: "purple",
      marginTop: "10px",
    },
    card_btn_con: {
      position: "absolute",
      bottom: "-50px",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    description_con: {
      position: "absolute",
      maxHeight: "50%",
      top: "5px",
    },
  })
);

const Card: FC<CardProp> = ({ game, addToCartHandler, editGameHandler, createGameHandler }) => {
  const classes = useStyles();

  const { id, title, rating, description, price } = game;

  // eslint-disable-next-line no-shadow
  const showRating = (rating: number) =>
    Array.from(new Array(rating).keys()).map(() => (
      <StarIcon key={Math.random() * 1000} className={classes.star_color} />
    ));

  return (
    <StyledCard>
      <StyledCardInner>
        <StyledCardBg>
          <div className={classes.description_con}>
            <p>{description}</p>
          </div>
          <div className={classes.card_btn_con}>
            <Button
              className={classes.cart_btn}
              variant="contained"
              onClick={() => {
                addToCartHandler(game.id);
              }}
            >
              Add to cart
            </Button>
            <Button
              className={classes.cart_btn}
              variant="contained"
              onClick={() => {
                editGameHandler(id);
              }}
            >
              Edit
            </Button>
            <Button
              className={classes.cart_btn}
              variant="contained"
              onClick={() => {
                createGameHandler();
              }}
            >
              Create new
            </Button>
          </div>
        </StyledCardBg>
        <StyledCardFg>
          <StyledImage src={game.image} alt="as" />
          <StyledGameName>
            <p className={classes.game_title}>{title}</p>
            <p className={classes.game_price}>{price} RUB</p>
            <div className={classes.star_con}>
              {showRating(rating)} {/* return game rating */}
            </div>
          </StyledGameName>
        </StyledCardFg>
      </StyledCardInner>
    </StyledCard>
  );
};

export default Card;
