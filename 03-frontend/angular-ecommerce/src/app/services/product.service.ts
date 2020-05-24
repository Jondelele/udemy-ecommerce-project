import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../common/product";
import { map } from "rxjs/operators";

// @Injectable dekoraattori ProductService luokan päällä tarkoittaa että tämä service kyetään injektoimaan
// komponenttiin root eli kaikkiin komponetteihin koska root on se pää komponentti
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products';

  constructor(private httpClient: HttpClient) { }

  // TypeScriptissä todella hassu paluuarvon paikka koska se tulee paramien jälkeen
  // ja juuri ennen varsinaista koodia ja ekaa aaltosuljetta. Service laitetaan palauttamaan Observable<Product[]>
  // objecti, jonka avulla spring backarilta saatu data mappaantuu TS koodin puolella Product TS luokan mukaisesti.
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Luodaan uusi URL category id:n mukaan
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // < ja > merkkien välissä on GetResponse interface, koska se maarittaa minkäläiseksi haettu JSON data castataan.
    // Paramteriksi ei tarvita mitään muuta kuin URL, josta JSON product data haetaan. Palautunut vastaus ohjataan
    // pipellä map funktiolle, joka hakee tuotteet responsesta _embedded.products attribuutista.
    // _embedded on siis olio, jonka sisällä on products lista, jonka sisällä siis productit tuotteet ovat!!!
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

// Unwrappaa JSON datan Spring Data REST kirjaston palauttamasta _embedded entrysta!!
// interface GetResponse määrittää mihin muotoon REST API:n palauttama palautus castataan.
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
