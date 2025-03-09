import { useContext } from "react";
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import SkeletonCard from "./SkeletonCard";

const ProductList = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const {products, categories, loading, initialLoading, selectedCategory, searchQuery, handleCategoryChange, handleSearchQueryChange, lastProductRef } = context;

  return (
    <>
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSelectCategory={handleCategoryChange}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <Grid container spacing={2} padding={2} maxWidth={1200} margin={"auto"}>
        {initialLoading || loading ? (
        [...Array(6)].map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <SkeletonCard />
          </Grid>
        ))) : (
          products.map((product, index) => (
            <Grid
              key={`${index}-${product.sku}`}
              ref={index === products.length - 1 ? lastProductRef : null}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <ProductCard product={product} />
            </Grid>
          ))
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
    </>
  );
};

export default ProductList;

