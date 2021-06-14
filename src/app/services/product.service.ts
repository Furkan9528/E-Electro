import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@e-commerce-env/environment';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 
   constructor(private httpClient: HttpClient) {}

   getProductList(theCategoryId: number):Observable<Product[]>{
     
    // need to build URL based on category id 
    const searchUrl = `${environment.backendPath}/search/findByCategoryId?id=${theCategoryId}`;
    
    return this.getProducts(searchUrl);

   }

  searchProduts(theKeyword: string): Observable<Product[]> {
    
    // need to build URL based on the keyword 
    const searchUrl = `${environment.backendPath}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
   }

   getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(`${environment.urlCategory}`).pipe(
      map(response=> response._embedded.productCategory)
      );
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }





}




interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}

