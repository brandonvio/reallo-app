import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { MyPropertiesPage } from "./pages/MyPropertiesPage";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import NavBar from "./components/NavBar";
import "./bootstrap.min.css";

// const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeWithDevTools()));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container fluid={false}>
          <NavBar />
          <br />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/myproperties" component={MyPropertiesPage} exact />
          </Switch>
        </Container>
        <br />
      </Router>
    </Provider>
  );
}

export default App;
