import { Box, CircularProgress, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import { AppContext, API } from "../App";
import { useDebounce } from "../hooks/UseDebounce";

let totalPageCount = 0;

const VariantOne = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [stories, setStories] = useState([]);
  const [queryText] = useContext(AppContext);

  useEffect(() => {
    setPage(0);
  }, [queryText]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const debouncedURL = useDebounce(`${API}query=${queryText}&page=${page}`);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios({
      method: "GET",
      url: debouncedURL,
    })
      .then((response) => {
        setStories(response.data.hits);
       totalPageCount = response.data.nbPages;
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, [debouncedURL]);

  return (
    <>
      {isError ? (
        <h1>Error</h1>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Pagination
            variant="outlined"
            color="primary"
            count={totalPageCount}
            page={page + 1}
            boundaryCount={15}
            onChange={handleChange}
            sx={{ mt: ".5rem" }}
          />
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <List stories={stories} setStories={setStories} />
          )}
        </Box>
      )}
    </>
  );
};

export default VariantOne;
