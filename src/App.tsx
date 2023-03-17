import { useState } from "react";
import RouteChangeTracker from "./lib/RouteTracker";
import Router from "./shared/Router";

function App() {
  RouteChangeTracker();
  return <Router />;
}

export default App;
