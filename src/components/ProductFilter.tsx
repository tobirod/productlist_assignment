import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { MenuItem, Select, InputLabel, FormControl, IconButton, Box } from "@mui/material";
import { Category } from "../types";
import ClearIcon from "@mui/icons-material/Clear";

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  onSelectCategory: (category: string) => void;
  onSearchQueryChange: (query: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, selectedCategory, searchQuery, onSelectCategory, onSearchQueryChange }) => {
    return (
        <Grid container spacing={2} sx={{ maxWidth: 1200, padding: 2, margin: "auto" }}>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    fullWidth
                    sx={{ 
                        backgroundColor: "white",
                        borderRadius: "4px",
                        "& input:-webkit-autofill": {
                            backgroundColor: "white !important",
                            WebkitBoxShadow: "0 0 0px 1000px white inset !important",
                        },
                    }}
                    slotProps={{
                        input: {
                            endAdornment: searchQuery ? (
                            <IconButton onClick={() => onSearchQueryChange("")} size="small">
                                <ClearIcon />
                            </IconButton>
                            ) : null,
                        },
                }}
            />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box display="flex">
                    <FormControl id="category-select" variant="outlined" fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            id="category-select"
                            labelId="category-label"
                            label="Category"
                            variant="outlined"
                            value={selectedCategory}
                            sx={{ backgroundColor: "white", borderRadius: "4px" }}
                            onChange={(e) => onSelectCategory(e.target.value as string)}
                            MenuProps={{
                                disableScrollLock: true,
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                        overflowY: "auto",
                                    },
                                },
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.slug} value={category.slug} selected={category.slug === selectedCategory}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {selectedCategory && (
                        <IconButton onClick={() => onSelectCategory("")} size="small" sx={{ marginLeft: 1, alignSelf: "center" }}>
                            <ClearIcon />
                        </IconButton>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default React.memo(ProductFilter);