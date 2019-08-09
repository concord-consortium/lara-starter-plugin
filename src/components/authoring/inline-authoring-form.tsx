import * as React from "react";

import * as css from "./authoring-app.sass";
import { ILogEvent } from "../../utilities/analytics";

import { IAuthoredState } from "../../types";

interface IProps {
  initialAuthoredState: IAuthoredState;
  saveAuthoredPluginState: (json: string) => void;
}

interface IState {
  authoredState: IAuthoredState;
}

export default class InlineAuthoringForm extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: this.setInitialState()
  };

  public render() {
    const { authoredState } = this.state;
    return (
      <div className={css.inlineAuthoringContainer}>
        <div className={css.preview}>
          TBD
        </div>
        <div className={css.inlineFormButtons}>
          <button onClick={this.saveAuthoredState} className="embeddable-save">Save</button>
          <button className="close">Cancel</button>
        </div>
      </div>
    );
  }

  private cloneState(newState: IAuthoredState) {
    const prevState = (this.state && this.state.authoredState) || this.props.initialAuthoredState;
    return Object.assign({}, prevState, newState);
  }

  private setInitialState(): IAuthoredState {
      return this.cloneState(this.props.initialAuthoredState);
  }

  private saveAuthoredState = () => {
    this.props.saveAuthoredPluginState(JSON.stringify(this.state.authoredState));
  }
}
