import * as React from "react";
import * as ReactDOM from "react-dom";

import * as css from "./authoring-app.sass";
import JsonEditor from "./json-editor";

import { IAuthoredState } from "../../types";
import PluginComponent from "../plugin-component";

const defaultProps: IAuthoredState = {
  helloText: "Hello There!"
};

const portalDom = document.createElement("div");

interface IProps {
  initialAuthoredState: IAuthoredState;
}

interface IState {
  authoredState: IAuthoredState;
}

// Headless container that provides state to children.
export default class AuthoringApp extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: this.setInitialState()
  };

  public render() {
    const { authoredState } = this.state;
    const { helloText } = authoredState;
    return (
      <div className={css.container}>
        <div className={css.preview}>
          <PluginComponent authoredState={authoredState} />
        </div>
        <div className={css.json}>
          <JsonEditor authoredState={authoredState} onSave={this.updateState} />
        </div>
      </div>
    );
  }

  private updateState = (newState: IAuthoredState) => {
    this.setState({authoredState: this.cloneState(newState)});
  }

  private cloneState(newState: IAuthoredState) {
    const prevState = (this.state && this.state.authoredState) || this.props.initialAuthoredState;
    return Object.assign({}, prevState, newState);
  }

  private setInitialState(): IAuthoredState {
      return this.cloneState(this.props.initialAuthoredState);
  }
}

const targetDiv = document.getElementById("window-shade-editor");
ReactDOM.render(<AuthoringApp initialAuthoredState={defaultProps}/>, targetDiv);
