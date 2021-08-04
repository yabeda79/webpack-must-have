import styled from "styled-components";
import { List, ListItem } from "@material-ui/core";

export const StyledCardCon = styled.div`
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  height: 55%;
  @media (max-width: 960px) {
    position: relative;
    top: 5%;
    grid-template-columns: 100%;
    justify-content: center;
  }
`;

export const StyledHiddenList = styled(List)({
  backgroundColor: "#ceced6",
  width: "80%",
  position: "absolute",
  top: "128px", //65px
  padding: "0",
  zIndex: 10,
});

export const StyledHiddenListItem = styled(ListItem)({
  borderBottom: "3px solid transparent",
  "&:hover": { transition: "0.5s", borderBottom: "3px solid #b83567", backgroundColor: "#bdbdc7" },
});

export const StyledCategoriesCon = styled.div`
  width: 100%;
  position: absolute;
  top: 170px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  @media (max-width: 960px) {
    position: relative;
    top: 5%;
    grid-template-columns: 100%;
    justify-content: center;
  }
`;

export const StyledCategory = styled.div`
  width: 250px;
  height: 210px;
  background-color: #bdbdbd;
  justify-self: center;
  border: 2px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 7px solid transparent;
  border-radius: 15px;
  cursor: pointer;

  display: flex;
  justify-content: center;

  position: relative;
  margin: 10px;

  &:hover {
    transition: 0.5s;
    border: 2px solid #b83567;
    border-bottom: 7px solid #b83567;
    border-right: 7px solid #b83567;
  }
`;

export const StyledCatText = styled.p`
  position: absolute;
  bottom: 15px;
  font-size: 24px;
`;
