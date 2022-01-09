import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ProductAndDiscount } from '../models/product.model';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class ProductAndDiscountService {

  baseUrl = Instance.url + "/api/product-discount";

  constructor(private http: HttpClient) { }

  getProductAndDiscountService(productId: number): Observable<ProductAndDiscount> {
    return this.http.get<ProductAndDiscount>(this.baseUrl + "/" + productId);
  }

}
