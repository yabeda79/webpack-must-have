/* eslint-disable import/no-cycle */
import { FC, useState, useEffect } from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";

import "./styles/main.css";
import "./styles/main.scss";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ListItemText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import ComputerIcon from "@material-ui/icons/Computer";
import GamesIcon from "@material-ui/icons/Games";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import store from "./redux/store";
import {
  StyledCardCon,
  StyledHiddenList,
  StyledHiddenListItem,
  StyledCategoriesCon,
  StyledCategory,
  StyledCatText,
} from "./styled";

// components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Products from "./components/products/products";
import About from "./components/about/about";
import ErrorBoundary from "./components/ErrorBoundary";
import Card from "./components/card/card";
import Profile from "./components/profile/profile";

// modals
import SignIn from "./components/modals/signin";
import SignUp from "./components/modals/sighup";
import { useAuth } from "./hooks/auth.hook";
import Loading from "./components/loading/loading";
import { useHttp } from "./hooks/http.hook";
import Cart from "./components/cart/cart";

import { IUser } from "./redux/initialState";
import { LOCAL_STORAGE_AUTH } from "./localstorage";

interface AppState {
  iMadeError?: boolean;
  apiResponse?: string;
}

export interface IGame {
  id: number;
  title: string;
  genre: string;
  age: number;
  PC: boolean;
  PS: boolean;
  Xbox: boolean;
  rating: number;
  description: string;
  image: string;
  price: number;
  manufacturer: string;
  createdAt: string;
  updatedAt: string;
}

type Games = IGame[];
type SearchData = string[];

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
  const [games, setGames] = useState<Games>([]);
  const [searchActiveData, setSearchActiveData] = useState<SearchData>([]);
  const [searchData, setSearchData] = useState<SearchData>([]);
  const [hide, setHide] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const [cartProduct, setCartProduct] = useState<Games>([]);

  const { loading, request } = useHttp();
  const { login, user, isAuthenticated } = useAuth();
  // const isAuthenticated = !!token;
  // const isAuthenticated = useSelector((state) => getIsAuthenticated(state));
  // const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH) || "{}");
    const { token, userId } = data;
    if (data && token && userId && typeof token === "string" && typeof userId === "string") {
      login(data as IUser);
    }
  }, []);

  const getGames = async () => {
    const data = await request<Games>("/api/getAll");
    setGames(data.slice(-3));
    const searchData: string[] = data.map(({ title }) => title);
    setSearchData(searchData);
    setSearchActiveData(searchData);
  };

  useEffect(() => {
    getGames();
  }, []);

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
    profile: "/profile",
    cart: "/cart",
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHide(true);
  };

  const searchHandler1 = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchActiveData(searchData.filter((name: string) => name.toLowerCase().includes(e.target.value.toLowerCase())));

    // eslint-disable-next-line no-unused-expressions
    e.target.value === "" ? setHide(true) : setHide(false);
  };

  const alertHandler = () => {
    alert("got it");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addToCartHandler = (id: number): void => {
    const item: IGame | undefined = games.find((game) => game.id === id);
    if (item) {
      setCartProduct([...cartProduct, item]);
    }
  };

  console.log("addToCartHandler state: ", cartProduct);

  return (
    // <AuthContext.Provider value={{ token, userName, login, logout, isAuthenticated }}>
    <BrowserRouter>
      {!isAuthenticated ? <Redirect from="/" to="/" /> : null}
      <Header
        setCurrentChoice={setCurrentChoice}
        setIsSignInOpen={setIsSignInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        cartProduct={cartProduct}
      />
      <Route path={links.products}>
        <ErrorBoundary>
          <Products iMadeError={iMadeError} currentChoice={currentChoice} addToCartHandler={addToCartHandler} />
        </ErrorBoundary>
      </Route>
      <Route path={links.about} exact>
        <About />
      </Route>
      <Route path={links.home} exact>
        <div className={classes.search_input_cont}>
          <form action="" className={classes.search_input_cont} onSubmit={submitHandler} onChange={searchHandler1}>
            <TextField className={classes.search_input} id="standart-basic" label="Search for games" variant="filled" />
          </form>
          <StyledHiddenList className={hide ? classes.hidden : ""}>
            {searchActiveData.map((el) => (
              <StyledHiddenListItem button onClick={alertHandler}>
                <ListItemText primary={el} />
              </StyledHiddenListItem>
            ))}
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
          {games.map((game) => (
            <Card key={game.id} game={game} addToCartHandler={addToCartHandler} />
          ))}
        </StyledCardCon>
        {loading ? <Loading /> : null}
      </Route>

      <Route path={links.profile} exact>
        {isAuthenticated ? <Profile userName={user?.userId} form={form} setForm={setForm} /> : <Redirect to="/" />}
      </Route>

      <Route path={links.cart} exact>
        <Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />
      </Route>
      <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      <SignIn isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} form={form} changeHandler={changeHandler} />
      <SignUp isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} form={form} changeHandler={changeHandler} />
      <Footer />
    </BrowserRouter>
    // </AuthContext.Provider>
  );
};

ReactDom.render(
  <Provider store={store}>
    <AppContainer />,
  </Provider>,
  document.getElementById("app")
);
