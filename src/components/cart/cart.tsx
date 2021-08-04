import { FC, useEffect, useState } from "react";

import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// eslint-disable-next-line import/no-cycle
import { IGame } from "@/main";
import { StyledDividerText, StyledTableCon, StyledColumnName } from "./styled";

import ConfirmBuy from "../modals/confirmbuy";

import CartProduct from "../cartproduct/cartproduct";

interface ICartProd extends IGame {
  amount?: number;
  checked?: boolean;
}

interface CartProp {
  cartProduct: ICartProd[];
  setCartProduct(value: []): void;
}

type CartItem = ICartProd[];

const useStyles = makeStyles(() =>
  createStyles({
    divider_margin: {
      marginTop: "15px",
    },
    buy_btn: {
      justifySelf: "center",
      gridColumnStart: "4",
    },
    remove_btn: {
      justifySelf: "center",
      gridColumnStart: "5",
    },
  })
);

const Cart: FC<CartProp> = ({ cartProduct, setCartProduct }) => {
  const classes = useStyles();

  const [isConfirmBuyOpen, setIsConfirmBuyOpen] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState("");

  const [cartItem, setCartItem] = useState<CartItem>([]);

  const getFormatDate = () => {
    const d = new Date();
    let currDate: number | string = d.getDate();
    let currMonth: number | string = d.getMonth() + 1;
    if (currMonth < 10) currMonth = `0${currMonth}`;
    if (currDate < 10) currDate = `0${currDate}`;
    const currYear = d.getFullYear();
    return `${currYear}/${currMonth}/${currDate}`;
  };

  const updateKeys = () => {
    const newProd: CartItem = cartProduct.map((el: {}) => ({ ...el, amount: 0, checked: false }));
    setCartItem(newProd);
  };

  useEffect(() => {
    setDate(getFormatDate());
    updateKeys();
  }, []);

  const increaseAmount = (id: number): void => {
    setCartItem(cartItem.map((item: ICartProd) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)));
    console.log(cartItem);
  };

  const decreaseAmount = (id: number): void => {
    setCartItem(
      cartItem.map((item) => (item.id === id ? { ...item, amount: item.amount > 0 ? item.amount - 1 : 0 } : item))
    );
    console.log(cartItem);
  };

  const handleCheckChange = (id: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    setCartItem(cartItem.map((item) => (item.id === id ? { ...item, checked: event.target.checked } : item)));
  };

  const getTotalPrice = () => {
    if (cartItem.length === 0) {
      setTotalPrice(0);
    } else {
      const totPrice = cartItem.reduce(
        (acc: number, el: ICartProd | undefined) => acc + parseInt(el.price) * el.amount,
        0
      );
      setTotalPrice(totPrice);
    }
  };

  useEffect(() => {
    getTotalPrice();
  }, [cartItem]);

  const removeHandler = () => {
    setCartProduct(cartProduct.filter((el) => !el.checked));
    setCartItem(cartItem.filter((el) => !el.checked));
  };

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
      {cartItem.map((el) => (
        <CartProduct
          key={el.id}
          id={el.id}
          name={el.title}
          PC={el.PC}
          PS={el.PS}
          Xbox={el.Xbox}
          date={date}
          amount={el.amount}
          checked={el.checked}
          price={el.price}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          handleCheckChange={handleCheckChange}
        />
      ))}
      <Divider className={classes.divider_margin} variant="middle" />
      <StyledTableCon>
        <div className={classes.buy_btn}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsConfirmBuyOpen(true);
            }}
          >
            Buy ({totalPrice})
          </Button>
        </div>
        <div className={classes.remove_btn}>
          <Button variant="outlined" onClick={removeHandler}>
            Remove
          </Button>
        </div>
      </StyledTableCon>
      <ConfirmBuy isConfirmBuyOpen={isConfirmBuyOpen} setIsConfirmBuyOpen={setIsConfirmBuyOpen} />
    </div>
  );
};

export default Cart;
