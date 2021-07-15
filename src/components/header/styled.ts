import { AppBar, List, ListItem } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import { NavLink, Link } from "react-router-dom";

export const StyledAppBar = styled(AppBar)({
  backgroundColor: "#85837e",
  height: "64px",
});

export const StyledLink = styled(NavLink)({
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.25rem",
  height: "64px",
  borderBottom: "3px solid transparent",
  display: "flex",
  alignContent: "center",
  padding: "20px",
  "&:hover": { transition: "0.5s", borderBottom: "3px solid #b83567", backgroundColor: "#676b68" },
  // "&:focus": { transition: "0.5s", borderBottom: "3px solid #b83567" },
  // "&:active": { transition: "0.5s", borderBottom: "3px solid #b83567" },
});

export const StyledProdLink = styled(NavLink)({
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.25rem",
  height: "64px",
  borderBottom: "3px solid transparent",
  display: "flex",
  alignContent: "center",
  padding: "20px",
  // "&:focus": { transition: "0.5s", borderBottom: "3px solid #b83567" },
  // "&:active": { transition: "0.5s", borderBottom: "3px solid #b83567" },
});

export const StyledNavDiv = styled("div")({
  margin: "0 auto",
});

export const StyledList = styled(List)({
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "155px",
  backgroundColor: "#85837e",
  padding: "0",
  margin: "0",
  position: "relative",
  // "&:hover": { transition: "0.5s", borderBottom: "3px solid #b83567", backgroundColor: "#676b68" },
});

export const StyledListItem = styled(ListItem)({
  height: "65px",
  boxSizing: "border-box",
  borderBottom: "3px solid transparent",
  "&:hover": { transition: "0.5s", borderBottom: "3px solid #b83567", backgroundColor: "#676b68" },
});

export const StyledHiddenList = styled(List)({
  backgroundColor: "#85837e",
  width: "155px",
  display: "block",
  position: "absolute",
  top: "65px",
});

export const StyledSmallLink = styled(NavLink)({
  textDecoration: "none",
  color: "white",
});
