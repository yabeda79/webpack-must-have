import { FC, useEffect } from "react";

import ProdPC from "../prodPC/prodPC";
import ProdPS from "../prodPS/prodPS";
import ProdXbox from "../prodXbox/prodXbox";
import AllProducts from "../allproducts/allproducts";

interface ProductsProps {
  iMadeError: boolean;
  currentChoice: string;
  children?: React.ReactChild | React.ReactNode;
}

const Products: FC<ProductsProps> = ({ currentChoice, iMadeError }) => {
  if (iMadeError) {
    throw new Error("Smth went wrong");
  }

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
    PC: "/PC",
    PS: "/PS",
    Xbox: "/Xbox",
  };

  return (
    <div>
      <div>Products page</div>
      {currentChoice === "" ? <AllProducts /> : null}
      {currentChoice === "PC" ? <ProdPC /> : null}
      {currentChoice === "PS" ? <ProdPS /> : null}
      {currentChoice === "Xbox" ? <ProdXbox /> : null}
    </div>
  );
};

export default Products;
