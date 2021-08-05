import { FC, useState } from "react";

import { Select, MenuItem, FormControl, Checkbox, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { StyledTableCon, StyledColumnName } from "./styled";

interface CartProductsProp {
  id: number;
  name: string;
  PC: boolean;
  PS: boolean;
  Xbox: boolean;
  date: string;
  amount: number | undefined;
  price: number;
  checked: boolean | undefined;
  decreaseAmount(value: number): void;
  increaseAmount(value: number): void;
  handleCheckChange(id: number, event: React.ChangeEvent<HTMLInputElement>): void;
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
    amount_btn: {
      maxWidth: "5px",
    },
  })
);

const CartProduct: FC<CartProductsProp> = ({
  id,
  name,
  PC,
  PS,
  Xbox,
  date,
  amount,
  price,
  checked,
  increaseAmount,
  decreaseAmount,
  handleCheckChange,
}) => {
  const classes = useStyles();
  console.log("Name: ", name);

  const [platform, setPlatform] = useState("");

  const platformHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlatform(event.target.value as string);
  };

  return (
    <StyledTableCon>
      <StyledColumnName>{name}</StyledColumnName>
      <FormControl className={classes.formControl}>
        <Select
          value={platform}
          onChange={platformHandleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
        >
          <MenuItem value="">Platform</MenuItem>
          {PC ? <MenuItem value="PC">PC</MenuItem> : null}
          {PS ? <MenuItem value="PS">Playstation 5</MenuItem> : null}
          {Xbox ? <MenuItem value="Xbox">Xbox One</MenuItem> : null}
        </Select>
      </FormControl>
      <StyledColumnName>{date}</StyledColumnName>
      <StyledColumnName>
        <Button
          className={classes.amount_btn}
          onClick={() => {
            increaseAmount(id);
          }}
        >
          +
        </Button>
        {amount}
        <Button
          className={classes.amount_btn}
          onClick={() => {
            decreaseAmount(id);
          }}
        >
          -
        </Button>
      </StyledColumnName>
      <StyledColumnName>{price}</StyledColumnName>

      <Checkbox
        checked={checked}
        onChange={(event) => {
          handleCheckChange(id, event);
        }}
        name="All genres"
      />
    </StyledTableCon>
  );
};

export default CartProduct;
