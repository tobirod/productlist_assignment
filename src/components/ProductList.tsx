import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid2';
import { Box, CircularProgress, Typography } from "@mui/material";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

const ProductList = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const {products, categories, loading, selectedCategory, searchQuery, handleCategoryChange, handleSearchQueryChange, lastProductRef } = context;

  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    opacity: loading ? 1 : 0,
    transition: "opacity 2s ease-in-out",
  });

  return (
    <div>
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSelectCategory={handleCategoryChange}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <Grid container spacing={2} padding={2} maxWidth={1200} margin={"auto"}>
        {products.map((product, index) => (
          <Grid 
            key={`${index}-${product.sku}`}
            ref={index === products.length - 1 ? lastProductRef : null}
            size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
        {loading && (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}>
            <StyledBox>
              <CircularProgress sx={{color: "#333"}} />
            </StyledBox>
          </Grid>
        )}
        {products.length === 0 && !loading && (
          <Grid sx={{ padding: 20, textAlign: "center", width: "100%" }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: 600,
                textDecoration: "underline",
              }}>
                No products found... try again!
              </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ProductList;

