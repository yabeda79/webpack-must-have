import { FC, useEffect, useState, useRef, Suspense } from "react";

import { useHttp } from "@/hooks/http.hook";

// import ProdPC from "../prodPC/prodPC";
// import ProdPS from "../prodPS/prodPS";
// import ProdXbox from "../prodXbox/prodXbox";
// import AllProducts from "../allproducts/allproducts";
import SeacrchBar from "../searchbar/searchbar";
import Card from "../card/card";

import { StyledMainCon, StyledCardCon } from "./styled";
import Filter from "../filter/filter";
import Loading from "../loading/loading";

interface ProductsProps {
  iMadeError: boolean;
  currentChoice: string;
  children?: React.ReactChild | React.ReactNode;
}

const Products: FC<ProductsProps> = ({ currentChoice, iMadeError }) => {
  if (iMadeError) {
    throw new Error("Smth went wrong");
  }

  const [criteria, setCriteria] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState({
    Allgenres: true,
    Shooter: false,
    Platformer: false,
    RPG: false,
    MMORPG: false,
  });
  const [age, setAge] = useState({
    Allages: true,
    three: false,
    six: false,
    twelve: false,
    eighteen: false,
  });
  const [hide, setHide] = useState(true);
  const [searchActiveProd, setSearchActiveProd] = useState([]);
  const [searchProd, setSearchProd] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const { request, loading } = useHttp();

  const getGames = async () => {
    const gamesres = await request("/api/getAll");
    const serData = gamesres.map(({ title }) => title);
    setSearchProd(serData);
    setSearchActiveProd(serData);
    setFilteredGames(serData);
  };

  const sortByCriteria = (a, b) => {
    if (type === "Ascending") {
      switch (criteria) {
        case "Age":
          return a.age - b.age;
        case "Rating":
          return a.rating - b.rating;
        case "Price":
          return a.price - b.price;
      }
    }
    if (type === "Descending") {
      switch (criteria) {
        case "Age":
          return b.age - a.age;
        case "Rating":
          return b.rating - a.rating;
        case "Price":
          return b.price - a.price;
      }
    }
  };

  const getFilteredGames = async () => {
    const res: { message: string } = await request("/api/getFiltered" + currentChoice, "POST", { ...genre, ...age });
    setFilteredGames(res.sort((a, b) => sortByCriteria(a, b)));
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getFilteredGames();
  }, [criteria, type, genre, age, currentChoice]);

  console.log(filteredGames);

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
      <StyledMainCon>
        <Filter
          criteria={criteria}
          setCriteria={setCriteria}
          type={type}
          setType={setType}
          genre={genre}
          setGenre={setGenre}
          age={age}
          setAge={setAge}
          currentChoice={currentChoice}
          getFilteredGames={getFilteredGames}
        />
        <SeacrchBar
          searchProd={searchProd}
          setSearchProd={setSearchProd}
          searchActiveProd={searchActiveProd}
          setSearchActiveProd={setSearchActiveProd}
          hide={hide}
          setHide={setHide}
        />

        <StyledCardCon>
          {filteredGames.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </StyledCardCon>

        {loading ? <Loading /> : null}
      </StyledMainCon>

      {/* {currentChoice === "" ? <AllProducts /> : null}
      {currentChoice === "PC" ? <ProdPC /> : null}
      {currentChoice === "PS" ? <ProdPS /> : null}
      {currentChoice === "Xbox" ? <ProdXbox /> : null} */}
    </div>
  );
};

export default Products;
