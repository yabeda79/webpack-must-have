import { FC, useState } from "react";

import CartProduct from "../cartproduct/cartproduct";

import Divider from "@material-ui/core/Divider";

import { StyledDividerText, StyledTableCon, StyledColumnName } from "./styled";

interface CartProp {
  // cartProduct: {
  //   id: number;
  //   title: string;
  //   genre: string;
  //   age: number;
  //   PC: boolean;
  //   PS: boolean;
  //   Xbox: boolean;
  //   rating: number;
  //   description: string;
  //   image: string;
  //   manufacturer: string;
  //   price: number;
  //   createdAt: string;
  //   updatedAt: string;
  // };
  cartProduct: [];
  setCartProduct(value: []): void;
}

const Cart: FC<CartProp> = ({ cartProduct, setCartProduct }) => {
  const [amount, setAmount] = useState(Array(CartProduct.length));
  const [checked, setChecked] = useState([]);
  const [date, setDate] = useState([]);

  return (
    <div>
      <StyledDividerText>Cart page</StyledDividerText>
      <Divider variant="middle" />
      <StyledTableCon>
        <StyledColumnName>Name</StyledColumnName>
        <StyledColumnName>Platform</StyledColumnName>
        <StyledColumnName>Order date</StyledColumnName>
        <StyledColumnName>Amount</StyledColumnName>
        <StyledColumnName>Price (RUB)</StyledColumnName>
      </StyledTableCon>
      <Divider variant="middle" />
      {cartProduct.map((el, ind) => {
        <CartProduct
          name={el.title}
          PC={el.PC}
          PS={el.PS}
          Xbox={el.Xbox}
          date={date[ind]}
          amount={amount[ind]}
          checked={checked[ind]}
          price={el.price}
        />;
      })}
    </div>
  );
};

export default Cart;
