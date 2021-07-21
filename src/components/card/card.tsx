import { FC } from "react";
import { StyledCard, StyledCardFg, StyledCardInner, StyledCardBg, StyledImage, StyledGameName } from "./styled";
import StarIcon from "@material-ui/icons/Star";
// import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles, createStyles, createTheme, Theme } from "@material-ui/core/styles";

interface CardProp {
  images?: any;
  // rotated?: boolean;
  // onClick?: (e: React.MouseEvent) => void;
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

const Card: FC<CardProp> = ({ images }) => {
  const classes = useStyles();

  const alertHandler = () => {
    alert("got it");
  };

  return (
    <StyledCard onClick={alertHandler}>
      <StyledCardInner>
        <StyledCardBg>
          <p>{images.description}</p>
        </StyledCardBg>
        <StyledCardFg>
          <StyledImage src={images.image} alt="as" />
          <StyledGameName>
            <p className={classes.game_title}>{images.title}</p>
            <p className={classes.game_price}>{images.price} RUB</p>
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
