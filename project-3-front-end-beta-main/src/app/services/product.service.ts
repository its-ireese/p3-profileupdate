import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount, Product, ProductAndDiscount } from '../models/product.model';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
   //---James Updated EndPoints to be More JWT Specific--//
  //Add product endpoint
  productsUrlAdd = Instance.url + "/api/products/add";
  //Update product endpoint
   productsUrlUpdate = Instance.url + "/api/products/update";
  //Delete product endpoint
  productsUrlDelete = Instance.url + "/api/products/delete"
  //Get One product endpoint
  productsUrlGetOne = Instance.url + "/api/products/getone";
  //Get all products endpoint
  productsUrlGetAll = Instance.url + "/api/products/getall";
  
  //Anthony's Endpoints for EC2
  discountProductUrlGet= Instance.url + "/discount/all/discountedProducts";
  discountUrlAdd = Instance.url + "/discount/add/discounts";
  discountUrlUpdate = Instance.url + "/discount/update/discounts";
  discountUrlRemove = Instance.url + "/discount/remove/discounts";

  // add other endpoints below if needed
  constructor(private http: HttpClient) { }

   //add Product
   addProductsService(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrlAdd, newProduct);
  }
   //Update a product
   updateProductsService(updateProd: Product): Observable<Product> {
    return this.http.put<Product>(this.productsUrlUpdate + "/" + updateProd.productId, updateProd);
  }
   //Delete one Product
   deleteProductsService(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrlDelete + "/" + productId);
  }
   //Get one Product
   getOneProductsService(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrlGetOne + "/" + productId);
  }

   //get all Products
   getAllProductsService(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrlGetAll);
  }

  // Anthony's Discount endpoints

  //get all Discounted Products from DB table
  getAllDiscountsProductsService(): Observable<ProductAndDiscount[]> {
    return this.http.get<ProductAndDiscount[]>(this.discountProductUrlGet);
  }

  //Adds inputted discount into backend
  addDiscountService(newDiscount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.discountUrlAdd, newDiscount);
  }
  updateDiscountService(updateDiscount: Discount): Observable<Product> {
    return this.http.put<Product>(this.discountUrlUpdate, updateDiscount);
  }

  deleteDiscountService(discountId: number): Observable<Discount> {
    return this.http.delete<Discount>(this.discountUrlRemove + "/" + discountId);
  }

}
