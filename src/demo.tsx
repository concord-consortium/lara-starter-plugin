import * as React from "react";
import * as ReactDOM from "react-dom";

import { IAuthoredState} from "./types";
import PluginComponent from "./components/plugin-component";

const authoredState: IAuthoredState = {
  helloText: "Howdy"
};

ReactDOM.render(
  <div>
    <PluginComponent authoredState={authoredState} />
  </div>,
  document.getElementById("plugin")
);
