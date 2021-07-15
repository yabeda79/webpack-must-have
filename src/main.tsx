import "./styles/main.css";
import "./styles/main.scss";

import { FC, StrictMode, useState } from "react";
import ReactDom from "react-dom";
// import style from "./styles/main.module.css";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

//components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Products from "./components/products/products";
import About from "./components/about/about";
import ErrorBoundary from "./components/ErrorBoundary";

interface AppState {
  iMadeError?: boolean;
  title?: string;
}

const AppContainer: FC<AppState> = () => {
  const [iMadeError, setIMadeError] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");

  const links = {
    home: "/",
    products: "/products",
    about: "/about",
  };

  console.log(typeof setCurrentChoice);

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
        <Footer />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </BrowserRouter>
    </div>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
