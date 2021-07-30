import { FC } from "react";

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

interface CartProductsProp {
  name: string;
  PC: boolean;
  PS: boolean;
  Xbox: boolean;
  date: string;
  amount: number;
  price: number;
  checked: boolean;
}

const CartProduct: FC<CartProductsProp> = ({ name, PC, PS, Xbox, date, amount, price, checked }) => {
  return (
    <div>
      <div>{name}</div>
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
          {PC ? <MenuItem value="PC">PC</MenuItem> : null}
          {PS ? <MenuItem value="PS">Playstation 5</MenuItem> : null}
          {PC ? <MenuItem value="Xbox">Xbox One</MenuItem> : null}
        </Select>
      </FormControl>
    </div>
  );
};

export default CartProduct;
