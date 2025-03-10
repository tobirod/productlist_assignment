import React, { useContext } from "react";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Category, Product } from "../types";
import { ProductContext } from "../context/ProductContext";
import { getCategoryIcon } from "../utils/getCategoryIcon";

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "520px",
  flexGrow: 1,
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductCard must be used within a ProductProvider");
  }

  const { categories } = context;
  const categoryName = categories.find((c: Category) => c.slug === product.category)?.name || "";
  const categoryIcon = getCategoryIcon(product.category);

  return (
    <StyledCard>
      {product.images?.[0] && (
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.title}
          sx={{ height: 200, objectFit: "contain" }}
        />
      )}
      <StyledCardContent>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Brand:</strong> {product.brand}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Chip
            label={categoryName}
            icon={categoryIcon}
            sx={{
              backgroundColor: "wheat",
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

export default ProductCard;