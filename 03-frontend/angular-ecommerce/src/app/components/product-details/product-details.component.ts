import { Component, OnInit } from '@angular/core';
import { Product } from "../../common/product";
import { ProductService } from "src/app/services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  // Injektoidaan ProductService alla tänne komponentin koodiin
  // Samalla constructorissa injektoidaan
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    // Get the "id" parameter string and conver into number
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
}
