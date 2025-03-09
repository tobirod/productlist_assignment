import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Product } from "../services/api";

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  gap: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <StyledCard>
      {product.images?.[0] && (
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]}
          alt={product.title}
        />
      )}
      <StyledCardContent>
        <div>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Brand:</strong> {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Category:</strong> {product.category}
          </Typography>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProductCard;