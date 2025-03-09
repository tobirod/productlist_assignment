import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
  position: "relative",
  top: 0,
  height: "80px",
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const Logo = styled("img")({
  marginRight: "12px",
  width: "50px",
  height: "50px",
  cursor: "pointer",
});

const TopBar: React.FC = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Logo src="/logo.svg" alt="Logo" onClick={() => window.location.reload() }/>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            sx={{ 
              background: "linear-gradient(45deg,rgb(255, 150, 150) 20%,rgb(200, 150, 255) 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}>
            Tobrod’s Warehouse of Wonders
          </Typography>
          <Typography variant="subtitle2" component="p" fontStyle={"italic"}>
            Come for the products, stay for the questionable branding!
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;