import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../common/product";

// @Component avainsanalla määritellään että mitkä templatet eli HTML ja CSS filut näyettään tässä komponentissa
// @Component avainsana määrittelee myös selectorin app-product-list, jotta komponentti kyetää injektoimaan
// muiden komponenttien sisään!!!! TAMA ON TODELLA TARKEÄ JUTTU YMMÄRTÄÄ!!! Selectorin avulla komponetti
// kyetään injektoimaan vaikka main komponenttiin tähän tyyliin: <app-product-list></app-product-list>
// Sivu voidaan siis luoda tuolla tavalla injektoimalla main komponettiin uusia komponentteja kaikkialle mihin
// niitä sitten tarvitaankin
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list-.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Luodaan jäsenmuuttujat johon tallennetaan Product:it sen jälkeen kun tama product-list komponentti
  // initialisoidaan, eli heti kun kayttaja menee sivulle, jossa tämä komponentti on injektoituna.
  products: Product[];

  // ProductService service injektoidaan product-list komponenttiin tassa constructorissa, jotta serviceen
  // paastaan käsiksi tässä komponentissa(ja saadaan haettua dataa backista servicella)!
  // Huomaa millainen TS syntaxi on kyseessä! Muista private näkyvyys asettaa!
  constructor(private productService: ProductService) { }

  // ngOnInit() funkkari lauotaan heti kun tämä komponentti käynnistetään, se kutsuu taman komponentin funkkaria
  // listProducts(), joka taas tilaa/subscribee servicen productService funkkarin getProductList().
  // subscribe() funkkari odotelee tyytyväisenä, kunnes service on saanut datan haettua ja kun data on tullut
  // "data" parametriin, niin se tallennetaan tähän ProductListComponent luokkaan arrayhyn "products".
  // Nyt products arrayn kautta pääsemme käsiksi product dataan ja kykenemme näyttämään sen suoraan käyttäjälle
  // HTML filussa tyyliin: <tr *ngFor="let tempProduct of products">
  //                            <td>{{ tempProduct.name }}</td>
  //                       </tr>
  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
