package com.productlist.api.service;

import com.productlist.api.entity.Product;
import com.productlist.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<Product> getProducts(Pageable pageable, String searchQuery, String category) {
        if (searchQuery != null && searchQuery.trim().isEmpty()) {
            searchQuery = null;
        }
        if (category != null && category.trim().isEmpty()) {
            category = null;
        }

        if (searchQuery != null && category != null) {
            return productRepository.findByCategoryAndTitleContainingIgnoreCase(category, searchQuery, pageable);
        } else if (searchQuery != null) {
            return productRepository.findByTitleContainingIgnoreCase(searchQuery, pageable);
        } else if (category != null) {
            return productRepository.findByCategory(category, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
