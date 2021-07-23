import { FC, useState, MouseEvent } from "react";

import { Toolbar, Typography, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import {
  StyledAppBar,
  StyledLink,
  StyledNavDiv,
  StyledList,
  StyledListItem,
  StyledProdLink,
  StyledHiddenList,
  StyledHiddenListItem,
  StyledSmallLink,
} from "./styled";

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
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  const handleMouseMove = () => {
    setOpen(true);
  };

  const handleClick = () => {
    props.setCurrentChoice("");
  };

  const handlePCClick = () => {
    props.setCurrentChoice("PC");
  };

  const handlePSClick = () => {
    props.setCurrentChoice("PS");
  };

  const handleXboxClick = () => {
    props.setCurrentChoice("Xbox");
  };

  return (
    <div>
      <StyledAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1">
            Best Games Market
          </Typography>
          <StyledNavDiv />
          <StyledLink to={links.home}>Home</StyledLink>

          <StyledList onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
            {/* onMouseOver={handleClick} onMouseOut={handleMouseOut} */}
            <StyledListItem button className={classes.list_item}>
              <StyledProdLink to={links.products} onClick={handleClick}>
                Products
              </StyledProdLink>
              {open ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            <StyledHiddenList
              className={!open ? classes.hidden : ""}
              disablePadding
              onMouseMove={handleMouseMove}
              onMouseOut={handleMouseOut}
            >
              <StyledSmallLink to={links.products}>
                <StyledHiddenListItem button onClick={handlePCClick}>
                  <ListItemText primary="PC" />
                </StyledHiddenListItem>
              </StyledSmallLink>
              <StyledSmallLink to={links.products}>
                <StyledHiddenListItem button onClick={handlePSClick}>
                  <ListItemText primary="Playstation 5" />
                </StyledHiddenListItem>
              </StyledSmallLink>
              <StyledSmallLink to={links.products}>
                <StyledHiddenListItem button onClick={handleXboxClick}>
                  <ListItemText primary="Xbox One" />
                </StyledHiddenListItem>
              </StyledSmallLink>
            </StyledHiddenList>
          </StyledList>

          <StyledLink to={links.about}>About</StyledLink>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Header;
