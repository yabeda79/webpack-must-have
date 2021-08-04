import { FC, useState } from "react";

// eslint-disable-next-line import/no-cycle
import { IGame } from "@/main";

import { useAuth } from "@/hooks/auth.hook";

import { Toolbar, Typography, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
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
  cartProduct: IGame[]; // импортирвать интерфейс с мейн
  viewport: number;
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
    mobile_nav_menu: {
      position: "absolute",
      top: "8%",
      left: "0",
      minHeight: "92%",
      width: "100%",
      backgroundColor: "#85837e",
      zIndex: 5,
    },
  })
);

const Header: FC<HeaderProps> = ({ setCurrentChoice, setIsSignInOpen, setIsSignUpOpen, cartProduct, viewport }) => {
  const classes = useStyles();

  const auth = useAuth();

  const [open, setOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const openModal = () => {
    if (!auth.isAuthenticated) {
      // !isAisAuthenticated
      setIsSignInOpen(true);
    }
  };

  const links = {
    home: "/",
    products: auth.isAuthenticated ? "/products" : "/", // !sAisAuthenticated
    about: auth.isAuthenticated ? "/about" : "/", // !sAisAuthenticated
    profile: "/profile",
    cart: "/cart",
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  const handleMouseMove = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setCurrentChoice("All");
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
      {viewport > 960 ? (
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
            {auth.isAuthenticated ? ( // isAuthenticated
              <>
                <StyledLink to={links.profile} onClick={openModal}>
                  {auth.user?.userId}
                </StyledLink>
                <StyledLink to={links.cart} onClick={openModal}>
                  <ShoppingCartIcon />
                  {cartProduct.length}
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
      ) : (
        <>
          <StyledAppBar position="sticky">
            <Toolbar>
              <IconButton onClick={openMobileNav} edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="h1">
                Best Games Market
              </Typography>
            </Toolbar>
          </StyledAppBar>
          <div className={isMobileNavOpen ? classes.mobile_nav_menu : classes.hidden}>
            <StyledLink to={links.home} onClick={openMobileNav}>
              Home
            </StyledLink>
            <StyledLink
              to={links.products}
              onClick={() => {
                openMobileNav();
                handleClick();
              }}
            >
              Products
            </StyledLink>
            <StyledLink
              to={links.products}
              onClick={() => {
                openMobileNav();
                handlePCClick();
              }}
            >
              PC
            </StyledLink>
            <StyledLink
              to={links.products}
              onClick={() => {
                openMobileNav();
                handlePSClick();
              }}
            >
              PS
            </StyledLink>
            <StyledLink
              to={links.products}
              onClick={() => {
                openMobileNav();
                handleXboxClick();
              }}
            >
              Xbox
            </StyledLink>
            <StyledLink to={links.about} onClick={openMobileNav}>
              About
            </StyledLink>
            {auth.isAuthenticated ? ( // isAuthenticated
              <>
                <StyledLink
                  to={links.profile}
                  onClick={() => {
                    openModal();
                    openMobileNav();
                  }}
                >
                  {auth.user?.userId}
                </StyledLink>
                <StyledLink
                  to={links.cart}
                  onClick={() => {
                    openModal();
                    openMobileNav();
                  }}
                >
                  <ShoppingCartIcon />
                  {cartProduct.length}
                </StyledLink>
                <StyledSign onClick={auth.logout}>Logout</StyledSign>
              </>
            ) : (
              <>
                <StyledSign onClick={handleOpenSignIn}>Sign in</StyledSign>
                <StyledSign onClick={handleOpenSignUp}>Sign up</StyledSign>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
