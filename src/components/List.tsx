import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: ".8rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const List = ({ stories, setStories, lastHitElement }: any) => {
  const theme = useTheme();

  function handleDeleteClick(itemID: number) {
    setStories(stories?.filter((story: any) => story.objectID !== itemID));
  }

  const navigate = useNavigate();

  function handleTitleClick(itemID: number) {
    stories?.map((story: any) => {
      if (story.objectID === itemID)
        return navigate("/rawContent", { state : { story } });
    });
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "1400px", mt: "1rem", mb: "5rem" }}
    >
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "350px" }}>Title</StyledTableCell>
            <StyledTableCell sx={{ width: "350px" }}>URL</StyledTableCell>
            <StyledTableCell sx={{ width: "210px" }}>Author</StyledTableCell>
            <StyledTableCell sx={{ width: "150px" }}>Comments</StyledTableCell>
            <StyledTableCell sx={{ width: "100px" }}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories?.map((item: any, index: number) => {
            if (stories.length === index + 1) {
              return (
                <StyledTableRow
                  key={item.objectID}
                  ref={lastHitElement}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    data-testid="cell-title1"
                    sx={{
                      maxWidth: "350px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTitleClick(item.objectID)}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "350px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.url}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "210px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.author}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.num_comments}
                  </TableCell>
                  <TableCell
                    data-testid="cell-delete1"
                    sx={{
                      minWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      display: "flex",
                      gap: ".5rem",
                    }}
                    onClick={() => handleDeleteClick(item.objectID)}
                  >
                    Delete
                    <HighlightOffIcon fontSize="small" />
                  </TableCell>
                </StyledTableRow>
              );
            } else {
              return (
                <StyledTableRow
                  key={item.objectID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    data-testid="cell-title2"
                    sx={{
                      maxWidth: "350px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTitleClick(item.objectID)}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "350px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.url}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "210px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.author}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.num_comments}
                  </TableCell>
                  <TableCell
                    data-testid="cell-delete2"
                    sx={{
                      minWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      display: "flex",
                      gap: ".5rem",
                    }}
                    onClick={() => handleDeleteClick(item.objectID)}
                  >
                    Delete
                    <HighlightOffIcon fontSize="small" />
                  </TableCell>
                </StyledTableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
