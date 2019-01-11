import * as React from "react";
import PluginComponent from "./plugin-component";
import { shallow } from "enzyme";

const testingText =  "Hello World!";

const props = {
  helloText: testingText
};

describe("WindowShade component", () => {
  it("renders Hello World", () => {
    const wrapper = shallow(<PluginComponent authoredState={props}/>);
    expect(wrapper.text()).toEqual(testingText);
  });
});
