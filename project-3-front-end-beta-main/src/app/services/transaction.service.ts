import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from '../models/transaction.model';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = Instance.url + "/api/transaction";

  constructor(private http: HttpClient) { }

  sendTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }


}
