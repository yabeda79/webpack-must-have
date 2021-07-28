import { FC, useEffect, useState, useRef } from "react";

import { useHttp } from "@/hooks/http.hook";

// import ProdPC from "../prodPC/prodPC";
// import ProdPS from "../prodPS/prodPS";
// import ProdXbox from "../prodXbox/prodXbox";
// import AllProducts from "../allproducts/allproducts";
import SeacrchBar from "../searchbar/searchbar";
import Card from "../card/card";

import { StyledMainCon, StyledCardCon } from "./styled";
import Filter from "../filter/filter";

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

  const { request } = useHttp();

  const isCancelled = useRef(false);

  const getGames = async () => {
    const gamesres = await request("/api/getAll");
    const serData = gamesres.map(({ title }) => title);
    setSearchProd(serData);
    setSearchActiveProd(serData);
    setFilteredGames(serData);
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    !isCancelled ? getGames() : console.log("Cant breathe");
  }, [isCancelled]);

  const getFilteredGames = async () => {
    const resGenre: { message: string } = await request("/api/getFilteredByGenre", "POST", {
      ...genre,
    });
    // const dataGenre = await resGenre.json();
    const resAge: { message: string } = await request("/api/getFilteredByAge", "POST", {
      ...age,
    });
    // const dataAge = await resAge.json();
    const midArray = resGenre.concat(resAge);
    console.log(midArray);
    setFilteredGames(midArray.filter((v, i, a) => a.findIndex((t) => t.title === v.title) === i));
  };

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
      </StyledMainCon>

      {/* {currentChoice === "" ? <AllProducts /> : null}
      {currentChoice === "PC" ? <ProdPC /> : null}
      {currentChoice === "PS" ? <ProdPS /> : null}
      {currentChoice === "Xbox" ? <ProdXbox /> : null} */}
    </div>
  );
};

export default Products;
