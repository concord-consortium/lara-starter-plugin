import * as React from "react";
import { IAuthoredState} from "../types";
import * as css from "./plugin-component.sass";

interface IProps {
  authoredState: IAuthoredState;
}

interface IState { }

export default class PluginComponent extends React.Component<IProps, IState> {
  public state: IState = { };

  public render() {
    const { authoredState } = this.props;
    return (
      <div className={css.plugin}>
        {authoredState.helloText}
      </div>
    );
  }
}
