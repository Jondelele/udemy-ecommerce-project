package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring luo taustalla kaiken toiminnalisuuden automaagisesti! Noituutta!
    // Spring ei tarvitse mitään muuta kuin tiedon että JpaRepository<Product, Long> sekä
    // tiedon minkä rivin mukaan haetaan eli id tassa tapauksessa, kaikki muu tapahtuu taustalla
    // Taustalla siis tapahtuu: SELECT * FROM product WHERE category_id=?
    // Lisaa noituutta: Spring Data REST automaagisesti avaa reitin /api/products/search/findByCategoryId?id=2
    // Jolloin siitäkään ei tartte ressaa!!
    // Jotenkin metodin nimestä kohdasta CategoryId Spring tajuaa että halutaan hakea
    // category_id sarakkeen mukaan? Tama on suurta noituutta!
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
