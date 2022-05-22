import SearchAppBar from "./components/SearchAppBar";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VariantOne from "./pages/VariantOne";
import VariantTwo from "./pages/VariantTwo";
import Home from "./pages/Home";
import RawContent from "./pages/RawContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const API = "https://hn.algolia.com/api/v1/search?";
export const AppContext: any = createContext([]);

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#9ACD32",
    },
    secondary: {
      main: "#262626",
    },
    tertiary: {
      main: "#00e6e6",
    },
  },
});

function App() {
  const [queryText, setQueryText] = useState("");

  return (
    <AppContext.Provider value={[queryText, setQueryText]}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <SearchAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variantOne" element={<VariantOne />} />
          <Route path="/variantTwo" element={<VariantTwo />} />
          <Route path="/rawContent" element={<RawContent />} />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
