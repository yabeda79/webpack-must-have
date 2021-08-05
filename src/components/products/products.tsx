import { FC, useEffect, useState } from "react";

import { useHttp } from "@/hooks/http.hook";

// eslint-disable-next-line import/no-cycle
import { IGame } from "@/main";

import SeacrchBar from "../searchbar/searchbar";
// eslint-disable-next-line import/no-cycle
import Card from "../card/card";

import { StyledMainCon, StyledCardCon } from "./styled";
import Filter from "../filter/filter";
import Loading from "../loading/loading";

interface ProductsProps {
  iMadeError: boolean;
  currentChoice: string;
  addToCartHandler: (value: number) => void;
  editGameHandler: (value: number) => void;
  createGameHandler: (value: number) => void;
  openAdminPanel: boolean;
  children?: React.ReactChild | React.ReactNode;
}

type Games = IGame[];
type SearchData = string[];

const Products: FC<ProductsProps> = ({
  currentChoice,
  iMadeError,
  addToCartHandler,
  editGameHandler,
  createGameHandler,
  openAdminPanel,
}) => {
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
  const [searchActiveProd, setSearchActiveProd] = useState<SearchData>([]);
  const [searchProd, setSearchProd] = useState<SearchData>([]);
  const [filteredGames, setFilteredGames] = useState<Games>([]);

  const { request, loading } = useHttp();

  const getGames = async () => {
    const gamesres = await request<Games>("/api/getAll");
    const searchrData: string[] = gamesres.map(({ title }) => title);
    setSearchProd(searchrData);
    setSearchActiveProd(searchrData);
    // setFilteredGames(searchrData);
  };

  const sortByCriteria = (a: IGame, b: IGame) => {
    if (type === "Ascending") {
      // eslint-disable-next-line default-case
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
      // eslint-disable-next-line default-case
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
    // eslint-disable-next-line prefer-template
    const res = await request<Games>("/api/getFiltered" + currentChoice, "POST", { ...genre, ...age });
    setFilteredGames(res.sort((a: IGame, b: IGame) => sortByCriteria(a, b)));
  };

  useEffect(() => {
    getGames();
  }, [openAdminPanel]);

  useEffect(() => {
    getFilteredGames();
  }, [criteria, type, genre, age, currentChoice, openAdminPanel]);

  console.log(filteredGames);

  return (
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
        // setSearchProd={setSearchProd}
        searchActiveProd={searchActiveProd}
        setSearchActiveProd={setSearchActiveProd}
        hide={hide}
        setHide={setHide}
      />

      <StyledCardCon>
        {filteredGames.map((game) => (
          <Card
            key={game.id}
            game={game}
            addToCartHandler={addToCartHandler}
            editGameHandler={editGameHandler}
            createGameHandler={createGameHandler}
          />
        ))}
      </StyledCardCon>

      {loading ? <Loading /> : null}
    </StyledMainCon>
  );
};

export default Products;
