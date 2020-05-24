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

  private baseUrl = 'http://localhost:8081/api/product';

  constructor(private httpClient: HttpClient) { }

  // TypeScriptissä todella hassu paluuarvon paikka koska se tulee paramien jälkeen
  // ja juuri ennen varsinaista koodia ja ekaa aaltosuljetta. Service laitetaan palauttamaan Observable<Product[]>
  // objecti, jonka avulla spring backarilta saatu data mappaantuu TS koodin puolella Product TS luokan mukaisesti.
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
