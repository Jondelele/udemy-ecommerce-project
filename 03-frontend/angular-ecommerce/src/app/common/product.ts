// Luokkaa Product määrittää muodon tuote datalle frontissa
// Käyetään esimerkiksi product-list.component.ts filussa luokassa ProductListComponent luodessa
// jäsenmuuttujaa: products: Product[]; johon sitten tallennetaan backarilta servicen noutama
// lista tuotteista
// Product luokkaa käyettään myös kun servicen hakema JSON lista castataan Product muotoon
// interfacessa GetResponse
export class Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: number;
}
