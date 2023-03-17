import { useState } from "react";
import Router from "./shared/Router";
import ReactGA from "react-ga";
import { createBrowserHistory } from "@remix-run/router";
function App() {
  const gaTrackingId = import.meta.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
  ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용

  const history = createBrowserHistory();
  history.listen((response: any) => {
    console.log(response.location.pathname);
    ReactGA.set({ page: response.location.pathname });
    ReactGA.pageview(response.location.pathname);
  });
  return <Router />;
}

export default App;
