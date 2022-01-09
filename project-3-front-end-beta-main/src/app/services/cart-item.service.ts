import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartItem } from '../models/cart.model';
import { Instance } from "../models/Instance";


@Injectable({
  providedIn: 'root'
})

export class CartItemService {
  getCartAndItemsWithUserIdService() {
    throw new Error('Method not implemented.');
  }

  baseUrl = Instance.url + "/api/cart-items";

  constructor(private http: HttpClient) { }

  addNewItemService(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, item);
  }

  updateItemService(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.baseUrl, item);
  }

  removeItemService(itemId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + "/" + itemId);
  }


}
