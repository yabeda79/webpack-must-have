import { useEffect } from "react";

const ProdPC = () => {
  useEffect(() => {
    console.log("prodPC mounted");
  }, []);

  return (
    <div>
      <div>ProductsPC page</div>
    </div>
  );
};

export default ProdPC;
