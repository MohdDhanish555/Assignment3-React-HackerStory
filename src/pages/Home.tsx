import { Backdrop, Card, CardMedia, Button, CardContent } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import paginationGif from "../assets/images/pagination-3.gif";
import scrollGif from "../assets/images/mouse-scroll.gif";

const Home = () => {
  const [open, setOpen] = useState(true);
    
  // HANDLING BACKDROP
  function handleButton1() {
    setOpen(false);
    navigate("/VariantOne");
  };

  function handleButton2() {
    setOpen(false);
    navigate("/VariantTwo");
  };

  const navigate = useNavigate();
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          gap: "10rem",
        }}
        open={open}
      >
        <Card raised sx={{ maxWidth: 340, bgcolor: "rgba(0,0,0,0.2)" }}>
          <CardMedia
            component="img"
            height="194"
            image={paginationGif}
            alt="Variant 1"
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              data-testid="btn-V1"
              onClick={handleButton1}
            >
              Variant 1
            </Button>
          </CardContent>
        </Card>
        <Card
          raised
          sx={{
            maxWidth: 340,
            bgcolor: "rgba(0,0,0,0.2)",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={scrollGif}
            alt="Variant 2"
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              data-testid="btn-V2"
              variant="outlined"
              onClick={handleButton2}
            >
              Variant 2
            </Button>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default Home;
