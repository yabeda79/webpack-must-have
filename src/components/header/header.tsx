import { FC, useState, MouseEvent } from "react";

import {
  StyledAppBar,
  StyledLink,
  StyledNavDiv,
  StyledList,
  StyledListItem,
  StyledProdLink,
  StyledHiddenList,
  StyledSmallLink,
} from "./styled";

import { Toolbar, Typography, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

interface HeaderProps {
  setCurrentChoice: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "155px",
      backgroundColor: "#85837e",
      padding: "0",
      margin: "0",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    list_item: {
      margin: "0",
      padding: "0",
      backgroundColor: "#85837e",
    },
    hidden: {
      display: "none",
    },
  })
);

const Header: FC<HeaderProps> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
    PC: "/PC",
    PS: "/PS",
    Xbox: "/Xbox",
  };

  const handleClick = () => {
    console.log("handleClick " + open);
    setOpen(!open);
    props.setCurrentChoice("");
    // setOpen(true);
  };

  // const handleMouseOut = () => {
  //   console.log("handleMouseOut " + open);
  //   // setTimeout(() => {
  //   //   setOpen(false);
  //   // }, 1000);

  //   setOpen(false);
  // };

  // const handlerNavListClick = (e: MouseEvent<HTMLDivElement>) => {
  //   console.log(e.target);
  // };

  // const handlerPCClick = () => {
  //   props.setCurrentChoice("PC");
  // };

  // const handlerPSClick = () => {
  //   props.setCurrentChoice("PS");
  // };

  // const handlerXboxClick = () => {
  //   props.setCurrentChoice("XBox");
  // };

  return (
    <div>
      <StyledAppBar position="sticky">
        {/* //relative */}
        <Toolbar>
          <Typography variant="h6" component="h1">
            Best Games Market
          </Typography>
          <StyledNavDiv></StyledNavDiv>
          <StyledLink to={links.home}>Home</StyledLink>

          <StyledList onClick={handleClick}>
            {/*onMouseOver={handleClick} onMouseOut={handleMouseOut} */}
            <StyledListItem button className={classes.list_item}>
              <StyledProdLink to={links.products}>Products</StyledProdLink>
              {open ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
            <StyledHiddenList className={!open ? classes.hidden : ""} disablePadding>
              <StyledSmallLink to={links.products + links.PC}>
                <ListItem button>
                  <ListItemText primary="PC" />
                </ListItem>
              </StyledSmallLink>
              <StyledSmallLink to={links.products + links.PS}>
                <ListItem button>
                  <ListItemText primary="Playstation 5" />
                </ListItem>
              </StyledSmallLink>
              <StyledSmallLink to={links.products + links.Xbox}>
                <ListItem button>
                  <ListItemText primary="Xbox One" />
                </ListItem>
              </StyledSmallLink>
            </StyledHiddenList>
            {/* </Collapse> */}
          </StyledList>

          <StyledLink to={links.about}>About</StyledLink>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Header;
