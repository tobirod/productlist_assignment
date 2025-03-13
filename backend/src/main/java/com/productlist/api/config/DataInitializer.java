package com.productlist.api.config;

import com.productlist.api.entity.Category;
import com.productlist.api.entity.Product;
import com.productlist.api.repository.CategoryRepository;
import com.productlist.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClientException;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    // Uncomment the @Bean method to run data initialization for an empty database.
    // Usually not needed since data is loaded from the SQL files on docker compose.

    // @Bean
    public CommandLineRunner loadData() {
        return args -> {
            try {
                fetchAndSaveCategories();
                fetchAndSaveProducts();
            } catch (RestClientException e) {
                logger.error("Error fetching data from API: {}", e.getMessage());
            } catch (Exception e) {
                logger.error("Error initializing data: {}", e.getMessage());
            }
        };
    }

    private void fetchAndSaveCategories() {
        String categoriesUrl = "https://dummyjson.com/products/categories";
        List<Map<String, String>> categories = restTemplate.exchange(
                categoriesUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                }).getBody();

        if (categories != null && categoryRepository.count() == 0) {
            for (Map<String, String> categoryData : categories) {
                if (categoryData != null) {
                    Category category = new Category();
                    category.setSlug(categoryData.get("slug"));
                    category.setDisplayName(categoryData.get("name"));
                    categoryRepository.save(category);
                }
            }
            logger.info("Categories initialized successfully.");
        }
    }

    private void fetchAndSaveProducts() {
        int limit = 30;
        int skip = 0;
        boolean hasMoreProducts = true;

        while (hasMoreProducts) {
            String productsUrl = "https://dummyjson.com/products?limit=" + limit + "&skip=" + skip;
            Map<String, Object> productResponse = restTemplate.getForObject(productsUrl, Map.class);

            if (productResponse != null && productResponse.containsKey("products")) {
                Object productsObj = productResponse.get("products");

                if (productsObj instanceof List<?>) {
                    List<?> rawProducts = (List<?>) productsObj;

                    for (Object rawProduct : rawProducts) {
                        if (rawProduct instanceof Map<?, ?> productData) {
                            Product product = new Product();
                            product.setTitle(safeGetString(productData, "title"));
                            product.setDescription(safeGetString(productData, "description"));
                            product.setPrice(safeGetDouble(productData, "price"));
                            product.setBrand(safeGetString(productData, "brand"));
                            product.setCategory(safeGetString(productData, "category"));
                            product.setSku(String.valueOf(productData.get("id")));
                            product.setThumbnail(safeGetString(productData, "thumbnail"));

                            // Convert images to String array
                            List<String> images = safeGetStringList(productData, "images");
                            product.setImages(images.toArray(new String[0]));

                            productRepository.save(product);
                        }
                    }

                    skip += limit;
                } else {
                    hasMoreProducts = false;
                }
            } else {
                hasMoreProducts = false;
            }
        }
        logger.info("Products initialized successfully.");
    }

    // Helper methods to avoid ClassCastException and null values
    private String safeGetString(Map<?, ?> map, String key) {
        Object value = map.get(key);
        return value instanceof String ? (String) value : (value != null ? value.toString() : "");
    }

    private double safeGetDouble(Map<?, ?> map, String key) {
        Object value = map.get(key);
        return value instanceof Number ? ((Number) value).doubleValue() : 0.0;
    }

    private List<String> safeGetStringList(Map<?, ?> map, String key) {
        Object value = map.get(key);
        return value instanceof List<?> list ? list.stream()
                .filter(String.class::isInstance)
                .map(String.class::cast)
                .toList() : List.of();
    }
}
