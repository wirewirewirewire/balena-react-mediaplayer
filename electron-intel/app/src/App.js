import React, { useEffect } from "react";
import "./scss/app.scss";
import Start from "components/Start";
import {
  HashRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Debug from "components/Debug";
import fadeTransition from "./scss/pagetransition.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Trans, useTranslation } from "react-i18next";
import VideoPlayer from "components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import data, { getData, getDeviceData } from "ducks/data";
import Color from "color";
import { Loading } from "@wfp/ui";

const history = createBrowserHistory();

function App() {
  const [t, i18next] = useTranslation();
  const dispatch = useDispatch();

  const dataContent = useSelector(getData);
  const deviceData = useSelector(getDeviceData);

  useEffect(() => {
    dispatch(data.actions.fetch());
    const interval = setInterval(() => {
      dispatch(data.actions.fetch());
    }, 1000 * 60 * 0.5);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (deviceData && deviceData.color) {
      document.body.style.setProperty("--interactive-01", deviceData.color);
      document.body.style.setProperty(
        "--text-01",
        deviceData.textColor
          ? deviceData.textColor
          : "#000" /*deviceData.color*/
      );
      document.body.style.setProperty(
        "--interactive-02",
        Color(deviceData.color).darken(0.1)
      );
    }
  }, [dataContent]);

  if (dataContent === undefined) return <Loading />;

  return (
    <>
      <Debug />
      <HashRouter history={history}>
        <Switch>
          <Route path="*">
            <AnimatedRoutes />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

function AnimatedRoutes() {
  let location = useLocation();

  /*<TransitionGroup className="transitionGroup">
  <CSSTransition
    key={location.key}
    classNames={fadeTransition}
    timeout={500}
  >
      </CSSTransition>
    </TransitionGroup>
    */

  return (
    <Switch location={location}>
      {/*<Route path="/:type?/:id?" component={VideoPlayer} />*/}
      <Route path="/:type?/:id?" component={Start} />
    </Switch>
  );
}

export default App;
