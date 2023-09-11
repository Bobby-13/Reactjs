import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { Userdetails } from "./Components/UserDetails";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("Test1", () => {
  render(<App />);
  const add = screen.getByTestId("addusertest");
  fireEvent.click(add);
  const linkElement = screen.getByPlaceholderText("Enter your E-mail");
  fireEvent.change(linkElement, { target: { value: "Den" } });
  const message = screen.getByText("Invalid email *");
  expect(message).toBeInTheDocument();
});


test("Test2", () => {
  render(<App />);
  const add = screen.getByTestId("addusertest");
  fireEvent.click(add);
  const linkElement = screen.getByPlaceholderText("Enter your First Name");
  fireEvent.change(linkElement, { target: { value: "Den@" } });
  const message = screen.getByText("Only Alphabets to be entered *");
  expect(message).toBeInTheDocument();
});


test("Test3", () => {
  render(<App />);
  const add = screen.getByTestId("addusertest");
  fireEvent.click(add);
  const linkElement = screen.getByPlaceholderText("Enter your Last Name");
  fireEvent.change(linkElement, { target: { value: "Den@" } });
  const message = screen.getByText("Only Alphabets to be entered *");
  expect(message).toBeInTheDocument();
});





test("Test4", () => {
  render(<App />);
  const add = screen.getByTestId("addusertest");
  fireEvent.click(add);
  const linkElement = screen.getByPlaceholderText("Enter your Mobile Number");
  fireEvent.change(linkElement, { target: { value: "Den@" } });
  const message = screen.getByText("Invalid Mobile Number *");
  expect(message).toBeInTheDocument();
});







