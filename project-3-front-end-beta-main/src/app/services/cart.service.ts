import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cart } from '../models/cart.model';
import { Observable } from "rxjs";
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = Instance.url + "/api/cart";

  constructor(private http: HttpClient) { }

  updateCartService(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.baseUrl, cart);
  }


  addCartService(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, cart);
  }


}
