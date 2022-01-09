import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartAndItems } from '../models/cart.model';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})

export class CartAndItemsService {

  baseUrl = Instance.url + "/api/cart-and-items";

  constructor(private http: HttpClient) { }

  getCartAndItemsService(cartId: number): Observable<CartAndItems>{
    return this.http.get<CartAndItems>(this.baseUrl + "/cart/" + cartId);
  }

  getCartAndItemsWithUserIdService(userId: number): Observable<CartAndItems> {
    return this.http.get<CartAndItems>(this.baseUrl + "/user/" + userId);
  }

}
