import { FC, useState } from "react";

import {
  Divider,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { StyledFilterCon, StyledCatText, StyledFilterName, StyledSortCon, StyledInsideText } from "./styled";

interface FilterProps {
  currentChoice: string;
  criteria: string;
  setCriteria(value: string): void;
  type: string;
  setType(value: string): void;
  genre: {
    Allgenres: boolean;
    Shooter: boolean;
    Platformer: boolean;
    RPG: boolean;
    MMORPG: boolean;
  };
  setGenre(value: {}): void;
  age: {
    Allages: boolean;
    three: boolean;
    six: boolean;
    twelve: boolean;
    eighteen: boolean;
  };
  setAge(value: {}): void;
  getFilteredGames(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginRight: "5%",
      minWidth: 120,
    },
    formControl_genre: {
      marginLeft: "5%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    confirm_btn: {
      position: "absolute",
      right: "20px",
      margin: "5px",
    },
  })
);

const Filter: FC<FilterProps> = ({
  currentChoice,
  criteria,
  setCriteria,
  type,
  setType,
  genre,
  setGenre,
  age,
  setAge,
  getFilteredGames,
}) => {
  const classes = useStyles();

  const { Allgenres, Shooter, Platformer, RPG, MMORPG } = genre;
  const { Allages, three, six, twelve, eighteen } = age;

  const criteriaHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCriteria(event.target.value as string);
  };

  const typeHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const genreHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setGenre({ ...genre, [event.target.name]: event.target.checked });
    event.target.name !== "All genres"
      ? setGenre({ ...genre, Allgenres: false, [event.target.name]: event.target.checked })
      : setGenre({ Allgenres: true, Shooter: false, Platformer: false, RPG: false, MMORPG: false });
  };

  const ageHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setAge({ ...age, [event.target.name]: event.target.checked });
    event.target.name !== "All ages"
      ? setAge({ ...age, Allages: false, [event.target.name]: event.target.checked })
      : setAge({ ...age, Allages: true, three: false, six: false, twelve: false, eighteen: false });
  };

  return (
    <StyledFilterCon>
      <StyledCatText>{currentChoice}</StyledCatText>
      <Button variant="outlined" className={classes.confirm_btn} onClick={getFilteredGames}>
        Confirm
      </Button>
      <Divider variant="middle" />
      <StyledFilterName>Sort</StyledFilterName>
      <Divider variant="middle" />
      <StyledSortCon>
        <StyledInsideText>
          <span>Criteria</span>
        </StyledInsideText>
        <FormControl className={classes.formControl}>
          <Select
            value={criteria}
            onChange={criteriaHandleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
            variant="outlined"
          >
            <MenuItem value="">Criteria</MenuItem>
            <MenuItem value="Age">Age</MenuItem>
            <MenuItem value="Rating">Rating</MenuItem>
            <MenuItem value="Price">Price</MenuItem>
          </Select>
        </FormControl>
        <StyledInsideText>
          <span>Type</span>
        </StyledInsideText>
        <FormControl className={classes.formControl}>
          <Select
            value={type}
            onChange={typeHandleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
            variant="outlined"
          >
            <MenuItem value="">Type</MenuItem>
            <MenuItem value="Ascending">Ascending</MenuItem>
            <MenuItem value="Descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </StyledSortCon>
      <StyledFilterName>Genre</StyledFilterName>
      <Divider variant="middle" />
      <FormControl component="fieldset" className={classes.formControl_genre}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={Allgenres} onChange={genreHandleChange} name="All genres" />}
            label="All genres"
          />
          <FormControlLabel
            control={<Checkbox checked={Shooter} onChange={genreHandleChange} name="Shooter" />}
            label="Shooter"
          />
          <FormControlLabel
            control={<Checkbox checked={Platformer} onChange={genreHandleChange} name="Platformer" />}
            label="Platformer"
          />
          <FormControlLabel control={<Checkbox checked={RPG} onChange={genreHandleChange} name="RPG" />} label="RPG" />
          <FormControlLabel
            control={<Checkbox checked={MMORPG} onChange={genreHandleChange} name="MMORPG" />}
            label="MMORPG"
          />
        </FormGroup>
      </FormControl>
      <StyledFilterName>Age</StyledFilterName>
      <Divider variant="middle" />
      <FormControl component="fieldset" className={classes.formControl_genre}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={Allages} onChange={ageHandleChange} name="All ages" />}
            label="All ages"
          />
          <FormControlLabel control={<Checkbox checked={three} onChange={ageHandleChange} name="three" />} label="3+" />
          <FormControlLabel control={<Checkbox checked={six} onChange={ageHandleChange} name="six" />} label="6+" />
          <FormControlLabel
            control={<Checkbox checked={twelve} onChange={ageHandleChange} name="twelve" />}
            label="12+"
          />
          <FormControlLabel
            control={<Checkbox checked={eighteen} onChange={ageHandleChange} name="eighteen" />}
            label="18+"
          />
        </FormGroup>
      </FormControl>
    </StyledFilterCon>
  );
};

export default Filter;
