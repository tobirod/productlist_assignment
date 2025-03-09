import React from "react";
import { Box, Card, CardContent, CardMedia, Skeleton, Chip, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flexGrow: 1,
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
});

const SkeletonCard: React.FC = () => {
  return (
    <StyledCard>
      <CardMedia>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </CardMedia>
      <StyledCardContent>
        <Box>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="50%" height={20} />
          <Divider sx={{ my: 2 }} />
          <Chip
            label={<Skeleton variant="text" width={50} />}
            sx={{
              backgroundColor: "thistle",
              borderRadius: "16px",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          />
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default SkeletonCard;
