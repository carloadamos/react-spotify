import { shallow } from "enzyme";
import App from "./App";
import Login from "./Login";
import Dashboard from "./Dashboard";

describe("App", () => {
  test("renders Login", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  test("renders Dashboard", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Dashboard)).toHaveLength(0);
  });
});
