import ProdPC from "../prodPC/prodPC";
import ProdPS from "../prodPS/prodPS";
import ProdXbox from "../prodXbox/prodXbox";

import { Route, BrowserRouter, NavLink, Link, useParams } from "react-router-dom";

interface ProductsProps {
  iMadeError: boolean;
  currentChoice: string;
  children?: React.ReactChild | React.ReactNode;
}

const Products = (props: ProductsProps) => {
  if (props.iMadeError) {
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
      <BrowserRouter>
        <div>Products page</div>
        <Link to={links.products + links.PC}>link</Link>
        <Link to={links.products + links.PS}>link</Link>
        <Link to={links.products + links.Xbox}>link</Link>
        <Route path={links.products + links.PC} exact render={() => <ProdPC />}>
          {/* <ProdPC /> */}
        </Route>
        <Route path={links.products + links.PS} exact>
          <ProdPS />
        </Route>
        <Route path={links.products + links.Xbox} exact>
          <ProdXbox />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default Products;
