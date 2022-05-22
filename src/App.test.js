import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App, { AppContext } from "./App";
import List from "./components/List";
import SearchAppBar from "./components/SearchAppBar";
import Home from "./pages/Home";
import RawContent from "./pages/RawContent";
import VariantOne from "./pages/VariantOne";
import VariantTwo from "./pages/VariantTwo";


const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));




describe("SNAPSHOT testing", () => {
  test("", () => {
    const { AppComponent } = render(<App />);
    expect(AppComponent).toMatchSnapshot();
  });
});

const queryText = "react";
const setQueryText = jest.fn();

const storyOne = {
  title: "Learn React",
  url: "https://eprint.iacr.org/2021/1022",
  created_at: "2011-12-12",
  author: "grey-area",
  points: 1107,
  num_comments: 12,
  objectID: 1,
};

const storyTwo = {
  created_at: "2017-02-19T21:16:33.000Z",
  title: "Reflecting on one very, very strange year at Uber",
  url: "https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber",
  author: "grey-area",
  points: 4107,
  num_comments: 530,
  objectID: 3,
};

const storyThree = {
  created_at: "2021-04-05T14:04:22.000Z",
  title: "Google’s copying of the Java SE API was fair use [pdf]",
  url: "https://www.supremecourt.gov/opinions/20pdf/18-956_d18f.pdf",
  author: "pdoconnell",
  points: 4103,
  num_comments: 930,
  objectID: 4,
};

const stories = [storyOne, storyTwo];
const setStories = jest.fn();
const lastHitElement = storyOne;

describe("COMPONENTS testing", () => {
  test("APP Rendering...", () => {
    render(<App />);
  });

  test("HOME Rendering...", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const btnV1 = screen.getByTestId("btn-V1");
    const btnV2 = screen.getByTestId("btn-V2");
    fireEvent.click(btnV1);
    fireEvent.click(btnV2);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/VariantOne");
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/VariantTwo");
  });

  test("RAW CONTENT Rendering...", () => {
    render(
      <BrowserRouter>
        <RawContent />
      </BrowserRouter>
    );
    const btnRaw = screen.getByTestId("btn-Raw");
    fireEvent.click(btnRaw);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });

  test("VARIANT ONE Rendering...", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[queryText]}>{children}</AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <VariantOne />
      </BrowserRouter>,
      { wrapper }
    );
    
  });

  test("VARIANT TWO Rendering...", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[queryText]}>{children}</AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <VariantTwo />
      </BrowserRouter>,
      { wrapper }
    );
  });

  test("SEARCH APPBAR Rendering...", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[queryText, setQueryText]}>
        {children}
      </AppContext.Provider>
    );
    render(<SearchAppBar />, { wrapper });
    const inputBox = screen.getByPlaceholderText("Search…");
    fireEvent.change(inputBox, { target: { value: "TESTING" } });
  });

  test("LIST Rendering...", () => {
    render(
      <BrowserRouter>
        <List
          stories={stories}
          setStories={setStories}
          lastHitElement={lastHitElement}
        />
      </BrowserRouter>
    );
    const cellTitle1 = screen.getByTestId("cell-title1");
    const cellTitle2 = screen.getByTestId("cell-title2");
    const cellDelete1 = screen.getByTestId("cell-delete1");
    const cellDelete2 = screen.getByTestId("cell-delete2");
    fireEvent.click(cellTitle1);
    fireEvent.click(cellTitle2);
    fireEvent.click(cellDelete1);
    fireEvent.click(cellDelete2);
  });
});
