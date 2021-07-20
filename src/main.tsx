import "./styles/main.css";
import "./styles/main.scss";

import { FC, StrictMode, useState, useEffect } from "react";
import ReactDom from "react-dom";
// import style from "./styles/main.module.css";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { StyledCardCon } from "./styled";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Products from "./components/products/products";
import About from "./components/about/about";
import ErrorBoundary from "./components/ErrorBoundary";
import Card from "./components/card/card";

interface AppState {
  iMadeError?: boolean;
  title?: string;
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
      width: "100%",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
    },
  })
);

const AppContainer: FC<AppState> = () => {
  const classes = useStyles();

  const [iMadeError, setIMadeError] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [images, setImages] = useState([]);
  const [searchData, setSearchData] = useState("");

  const getImages = async () => {
    const images = await fetch("http://localhost:3000/games");
    const data = await images.json();
    setImages(data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
  };

  return (
    <div>
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
          <div>Home page</div>
        </Route>
        <div className={classes.search_input_cont}>
          <form action="" className="search_input_cont">
            <TextField
              className={classes.search_input}
              id="standart-basic"
              label="Search for games"
              variant="outlined"
            ></TextField>
          </form>
        </div>
        <Footer />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        {/* <StyledCardCon>
          {images.map((image, ind) => (
            <Card key={ind} url={image} />
          ))}
          <Card url={images[0]} />
          <Card url={images[1]} />
          <Card url={images[2]} /> 
        </StyledCardCon> */}
        {/* <img src={images.src} alt="" /> */}
      </BrowserRouter>
    </div>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
