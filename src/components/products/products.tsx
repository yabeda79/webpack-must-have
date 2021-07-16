import { FC, useEffect } from "react";

import ProdPC from "../prodPC/prodPC";
import ProdPS from "../prodPS/prodPS";
import ProdXbox from "../prodXbox/prodXbox";

interface ProductsProps {
  iMadeError: boolean;
  currentChoice: string;
  children?: React.ReactChild | React.ReactNode;
}

const Products: FC<ProductsProps> = ({ currentChoice, iMadeError }) => {
  if (iMadeError) {
    throw new Error("Smth went wrong");
  }

  useEffect(() => {}, [currentChoice]);

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
      {currentChoice === "" ? (
        <div>
          <ProdPC />
          <ProdPS />
          <ProdXbox />
        </div>
      ) : (
        ""
      )}
      {currentChoice === "PC" ? <ProdPC /> : ""}
      {currentChoice === "PS" ? <ProdPS /> : ""}
      {currentChoice === "Xbox" ? <ProdXbox /> : ""}
    </div>
  );
};

export default Products;
