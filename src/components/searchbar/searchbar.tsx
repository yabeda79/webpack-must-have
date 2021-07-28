import { FC } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ListItemText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { StyledSearchCon, StyledHiddenList, StyledHiddenListItem } from "./styled";

interface SearchProp {
  searchProd: [];
  searchActiveProd: [];
  setSearchActiveProd(value: []): void;
  hide: boolean;
  setHide(value: boolean): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search_input: {
      margin: 0,
      marginTop: "15px",
      width: "100%",
      justifySelf: "center",
    },
    search_input_cont: {
      width: "100%",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
      "&:active": {},
    },
    hidden: {
      display: "none",
    },
  })
);

const SeacrchBar: FC<SearchProp> = ({ searchProd, searchActiveProd, setSearchActiveProd, hide, setHide }) => {
  const classes = useStyles();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHide(true);
  };

  const searchHandler1 = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchActiveProd(searchProd.filter((name) => name.toLowerCase().includes(e.target.value.toLowerCase())));

    // eslint-disable-next-line no-unused-expressions
    e.target.value === "" ? setHide(true) : setHide(false);
  };

  const alertHandler = () => {
    alert("got it");
  };

  return (
    <StyledSearchCon>
      <form action="" className={classes.search_input_cont} onSubmit={submitHandler} onChange={searchHandler1}>
        <TextField className={classes.search_input} id="standart-basic" label="Search for games" variant="filled" />
      </form>
      <StyledHiddenList className={hide ? classes.hidden : ""}>
        {searchActiveProd.map((el) => (
          <StyledHiddenListItem button onClick={alertHandler}>
            <ListItemText primary={el} />
          </StyledHiddenListItem>
        ))}
      </StyledHiddenList>
    </StyledSearchCon>
  );
};

export default SeacrchBar;
