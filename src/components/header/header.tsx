import { FC, useState, useContext } from "react";

import { AuthContext } from "@/context/authContext";

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
  StyledSign,
} from "./styled";

interface HeaderProps {
  setCurrentChoice: (value: string) => void;
  setIsSignInOpen: (value: boolean) => void;
  setIsSignUpOpen: (value: boolean) => void;
  logout: () => void;
  userName: string;
  isAuthenticated: boolean;
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
    btn_main: {
      fontSize: "1.25rem",
      marginRight: "10px",
      marginLeft: "10px",
    },
    signin: {
      color: "white",
      borderColor: "white",
    },
  })
);

const Header: FC<HeaderProps> = ({
  setCurrentChoice,
  setIsSignInOpen,
  setIsSignUpOpen,
  logout,
  userName,
  isAuthenticated,
}) => {
  const classes = useStyles();

  const auth = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const openModal = () => {
    if (!isAuthenticated) {
      // !isAisAuthenticated
      setIsSignInOpen(true);
    }
  };

  const links = {
    home: "/",
    products: isAuthenticated ? "/products" : "/", // !sAisAuthenticated
    about: isAuthenticated ? "/about" : "/", // !sAisAuthenticated
    profile: "/profile",
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  const handleMouseMove = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setCurrentChoice("");
  };

  const handlePCClick = () => {
    setCurrentChoice("PC");
  };

  const handlePSClick = () => {
    setCurrentChoice("PS");
  };

  const handleXboxClick = () => {
    setCurrentChoice("Xbox");
  };

  const handleOpenSignIn = () => {
    setIsSignInOpen(true);
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
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
          <StyledList onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={openModal}>
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
          <StyledLink to={links.about} onClick={openModal}>
            About
          </StyledLink>
          {isAuthenticated ? ( // isAuthenticated
            <>
              <StyledLink to={links.profile} onClick={openModal}>
                {userName}
              </StyledLink>
              <StyledSign onClick={auth.logout}>Logout</StyledSign>
            </>
          ) : (
            <>
              <StyledSign onClick={handleOpenSignIn}>Sign in</StyledSign>
              <StyledSign onClick={handleOpenSignUp}>Sign up</StyledSign>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Header;
