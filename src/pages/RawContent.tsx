import { Box, Button} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const RawContent = () => {
  const { state }: any = useLocation();
  const newStory = JSON.stringify(state?.story, null, 4);
    const navigate = useNavigate();
    
  return (
    <>
      <Box display="flex" justifyContent="space-between">
      <pre>{newStory}</pre>;
        <Button
          sx={{
            alignSelf: "flex-start",
            margin : "1rem"
        }}
          variant="outlined"
          data-testid="btn-Raw"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default RawContent;
