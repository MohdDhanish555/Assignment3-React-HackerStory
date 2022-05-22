import { Box, Button, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const RawContent = () => {
  const { state }: any = useLocation();
  const newStory = JSON.stringify(state?.story, null, 4);
    const navigate = useNavigate();
    
  return (
    <>
      <Box position="fixed" right="20px" top="95px">
        <Button
          variant="outlined"
          data-testid="btn-Raw"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <pre>{newStory}</pre>;
    </>
  );
};

export default RawContent;
