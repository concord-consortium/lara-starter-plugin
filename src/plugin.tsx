import * as React from "react";
import * as ReactDOM from "react-dom";
import PluginApp from "./components/plugin-app";
import PluginConfig from "./config/plugin-config";
import {IExternalScriptContext, ILara} from "./lara/interfaces";

let PluginAPI: ILara;

const getAuthoredState = (context: IExternalScriptContext) => {
  if (!context.authoredState) {
    return {};
  }
  let authoredState;
  try {
    authoredState = JSON.parse(context.authoredState);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.warn("Unexpected authoredState:", context.authoredState);
    return {};
  }
  return authoredState;
};

export class TeacherEditionTipsPlugin {
  public context: IExternalScriptContext;
  public pluginAppComponent: any;

  constructor(context: IExternalScriptContext) {
    this.context = context;
    this.renderPluginApp();
  }

  public renderPluginApp = () => {
    PluginAPI = (window as any).LARA;
    const authoredState = getAuthoredState(this.context);
    if (PluginAPI.isTeacherEdition()) {
      this.pluginAppComponent = ReactDOM.render(
        <PluginApp
          authoredState={authoredState}
          wrappedEmbeddableDiv={this.context.wrappedEmbeddableDiv}
          wrappedEmbeddableContext={this.context.wrappedEmbeddableContext}
          PluginAPI={PluginAPI}
        />,
        this.context.div);
    }
  }
}

export const initPlugin = () => {
  PluginAPI = (window as any).LARA;
  const {PluginID, PluginName} = PluginConfig;
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    // tslint:disable-next-line:no-console
    console.warn(`LARA Plugin API not available, ${PluginName} terminating`);
    return;
  }
  // tslint:disable-next-line:no-console
  console.log(`LARA Plugin API available, ${PluginName} initialization`);
  PluginAPI.registerPlugin(PluginID, TeacherEditionTipsPlugin);
};

initPlugin();