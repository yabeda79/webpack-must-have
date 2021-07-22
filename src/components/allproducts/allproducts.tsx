import ProdPC from "../prodPC/prodPC";
import ProdPS from "../prodPS/prodPS";
import ProdXbox from "../prodXbox/prodXbox";

const AllProducts = () => {
  return (
    <div>
      <ProdPC />
      <ProdPS />
      <ProdXbox />
    </div>
  );
};

export default AllProducts;
