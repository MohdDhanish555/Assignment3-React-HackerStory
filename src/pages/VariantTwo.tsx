import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { API, AppContext, StoryType } from "../App";
import List from "../components/List";
import { useDebounce } from "../hooks/UseDebounce";



const VariantTwo = () => {
  const [page, setPage] = useState(0);
  const [queryText] = useContext(AppContext);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);

  useEffect(() => {
    setStories([]);
    setPage(0);
  }, [queryText]);

  const debouncedURL = useDebounce(`${API}query=${queryText}&page=${page}`);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios({
      method: "GET",
      url: debouncedURL,
    })
      .then((response) => {
        setStories((stories: any) => {
          return [...new Set([...stories, ...response.data.hits])];
        });
        setHasMoreData(response.data.hits.length > 0);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, [debouncedURL]);

  const observer : any = useRef();
  const lastHitElement = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreData) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
         rootMargin : "20px"
       }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreData]
  );

  return (
    <>
      {isError ? (
        <h1>Error</h1>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <List
            stories={stories}
            setStories={setStories}
            lastHitElement={lastHitElement}
          />
          {isLoading && (
            <Box mt="-50px">
              <CircularProgress />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default VariantTwo;
