import "./styles/main.css";
import "./styles/main.scss";

import { FC, useState, useEffect } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import {
  StyledCardCon,
  StyledHiddenList,
  StyledHiddenListItem,
  StyledCategoriesCon,
  StyledCategory,
  StyledCatText,
} from "./styled";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ListItemText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import ComputerIcon from "@material-ui/icons/Computer";
import GamesIcon from "@material-ui/icons/Games";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

// components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Products from "./components/products/products";
import About from "./components/about/about";
import ErrorBoundary from "./components/ErrorBoundary";
import Card from "./components/card/card";

interface AppState {
  iMadeError?: boolean;
  title: string;
  apiResponse?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search_input: {
      margin: theme.spacing(1),
      width: "80%",
      justifySelf: "center",
    },
    search_input_cont: {
      width: "100vw",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
      "&:active": {},
    },
    main: {
      width: "100vw",
      height: "100vh",
      background: "#e8e8f0",
    },
    divider_text: {
      marginLeft: "20px",
    },
    divider_top: {
      position: "absolute",
      top: "40%",
      width: "100%",
    },
    hidden: {
      display: "none",
    },
    cat_icon: {
      width: "70%",
      height: "70%",
    },
  })
);

const AppContainer: FC<AppState> = () => {
  const classes = useStyles();

  const [iMadeError, setIMadeError] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [images, setImages] = useState([]);
  const [searchActiveData, setSearchActiveData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [hide, setHide] = useState(true);

  const getImages = async () => {
    const images = await fetch("http://localhost:3000/games");
    const data = await images.json();
    setImages(data.slice(-3));
    const serData = data.map(({ title }) => {
      return title;
    });
    setSearchData(serData);
    setSearchActiveData(serData);
  };

  useEffect(() => {
    getImages();
  }, []);

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
  };

  const submitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHide(true);
  };

  const searchHandler1 = (e) => {
    setSearchActiveData(
      searchData.filter((name) => {
        return name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );

    e.target.value === "" ? setHide(true) : setHide(false);
  };

  const alertHandler = () => {
    alert("got it");
  };

  return (
    <div className={classes.main}>
      <BrowserRouter>
        <Header setCurrentChoice={setCurrentChoice} />
        <Route path={links.products}>
          <ErrorBoundary>
            <Products iMadeError={iMadeError} currentChoice={currentChoice} />
          </ErrorBoundary>
        </Route>
        <Route path={links.about} exact>
          <About />
        </Route>
        <Route path={links.home} exact>
          <div className={classes.search_input_cont}>
            <form action="" className={classes.search_input_cont} onSubmit={submitHandler} onChange={searchHandler1}>
              <TextField
                className={classes.search_input}
                id="standart-basic"
                label="Search for games"
                variant="filled"
                onClick={showHiddenListHandler}
              ></TextField>
            </form>
            <StyledHiddenList className={hide ? classes.hidden : ""}>
              {searchActiveData.map((el) => {
                return (
                  <StyledHiddenListItem button onClick={alertHandler}>
                    <ListItemText primary={el} />
                  </StyledHiddenListItem>
                );
              })}
            </StyledHiddenList>
          </div>
          <p className={classes.divider_text}>Categories</p>
          <Divider />

          <StyledCategoriesCon>
            <StyledCategory>
              <ComputerIcon className={classes.cat_icon} />
              <StyledCatText>PC</StyledCatText>
            </StyledCategory>
            <StyledCategory>
              <SportsEsportsIcon className={classes.cat_icon} />
              <StyledCatText>PlayStation</StyledCatText>
            </StyledCategory>
            <StyledCategory>
              <GamesIcon className={classes.cat_icon} />
              <StyledCatText>Xbox</StyledCatText>
            </StyledCategory>
          </StyledCategoriesCon>

          <div className={classes.divider_top}>
            <p className={classes.divider_text}>Top Games</p>
            <Divider />
          </div>
          <StyledCardCon>
            {images.map((image, ind) => (
              <Card key={ind} images={image} />
            ))}
          </StyledCardCon>
        </Route>
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
