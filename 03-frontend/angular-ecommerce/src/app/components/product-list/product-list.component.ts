import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../common/product";
import {ActivatedRoute} from "@angular/router";

// @Component avainsanalla määritellään että mitkä templatet eli HTML ja CSS filut näyettään tässä komponentissa
// @Component avainsana määrittelee myös selectorin app-product-list, jotta komponentti kyetää injektoimaan
// muiden komponenttien sisään!!!! TAMA ON TODELLA TARKEÄ JUTTU YMMÄRTÄÄ!!! Selectorin avulla komponetti
// kyetään injektoimaan vaikka main komponenttiin tähän tyyliin: <app-product-list></app-product-list>
// Sivu voidaan siis luoda tuolla tavalla injektoimalla main komponettiin uusia komponentteja kaikkialle mihin
// niitä sitten tarvitaankin
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Luodaan jäsenmuuttujat johon tallennetaan Product:it sen jälkeen kun tama product-list komponentti
  // initialisoidaan, eli heti kun kayttaja menee sivulle, jossa tämä komponentti on injektoituna.
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  // ProductService service injektoidaan product-list komponenttiin tassa constructorissa, jotta serviceen
  // paastaan käsiksi tässä komponentissa(ja saadaan haettua dataa backista servicella)!
  // Huomaa millainen TS syntaxi on kyseessä! Muista private näkyvyys asettaa!
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  // ngOnInit() funkkari lauotaan heti kun tämä komponentti käynnistetään, se kutsuu taman komponentin funkkaria
  // listProducts(), joka taas tilaa/subscribee servicen productService funkkarin getProductList().
  // subscribe() funkkari odotelee tyytyväisenä, kunnes service on saanut datan haettua ja kun data on tullut
  // "data" parametriin, niin se tallennetaan tähän ProductListComponent luokkaan arrayhyn "products".
  // Nyt products arrayn kautta pääsemme käsiksi product dataan ja kykenemme näyttämään sen suoraan käyttäjälle
  // HTML filussa tyyliin: <tr *ngFor="let tempProduct of products">
  //                            <td>{{ tempProduct.name }}</td>
  //                       </tr>
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // Gets the search mode query/path parameter from search/:keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // Now search for the products using keyword
    this.productService.searchProduct(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

    } else {
      // no category id available -> default to 1
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
