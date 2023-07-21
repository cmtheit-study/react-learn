import React from "react";
import ReactDom from "react-dom"
import {App} from "./components/App";
import "/assets/styles/index.scss";

ReactDom.render(
  <App />,
  document.getElementById("app")
)