import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export const StyledFooter = styled(AppBar)({
  position: "absolute",
  top: "auto",
  bottom: "0",
  backgroundColor: "#85837e", // #676b68 on hover #b83567 on border
});

export const StyledNavToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

export const StyledFooterTypo = styled(Typography)({
  display: "block",
  justifySelf: "center",
});

export const StyledA = styled("a")({
  textDecoration: "none",
  color: "white",
  padding: "15px",
});

export const StyledImg = styled("img")({
  height: "24px",
  width: "auto",
});
