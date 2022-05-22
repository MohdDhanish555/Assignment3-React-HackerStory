import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { AppContext } from "../App";
import { useTheme } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: "5rem",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const SearchAppBar = () => {
  const [queryText, setQueryText] = useContext(AppContext);
const theme = useTheme();
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQueryText(event.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ p: ".5rem 2rem", bgcolor: theme.palette.secondary.main }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            color="white"
          >
            HACKER
            <span style={{ color: theme.palette.primary.main }}>STORY</span>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "white" }} />
            </SearchIconWrapper>
            <StyledInputBase
              data-testid="styledInputBar"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={queryText}
              onChange={handleChange}
              sx={{ color: "#fff " }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    </Box>
  );
};

export default SearchAppBar;
