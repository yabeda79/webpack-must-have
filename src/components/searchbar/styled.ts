import styled from "styled-components";
import { List, ListItem } from "@material-ui/core";

export const StyledSearchCon = styled.div`
  justify-self: center;
  width: 80%;
`;

export const StyledHiddenList = styled(List)({
  backgroundColor: "#ceced6",
  width: "60%",
  position: "absolute",
  top: "9%", // 65px
  padding: "0",
  zIndex: 10,
});

export const StyledHiddenListItem = styled(ListItem)({
  borderBottom: "3px solid transparent",
  "&:hover": { transition: "0.5s", borderBottom: "3px solid #b83567", backgroundColor: "#bdbdc7" },
});
