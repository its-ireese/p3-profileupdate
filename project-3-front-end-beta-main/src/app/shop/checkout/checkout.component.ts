import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartAndItems, Cart, ItemProductAndDiscount, CartItem } from 'src/app/models/cart.model';
import { Product, ProductAndDiscount } from 'src/app/models/product.model';
import { CartAndItemsService } from 'src/app/services/cart-and-items.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from "../../models/transaction.model";
import { AuthService } from "../../services/auth.service";
import { CartService } from "../../services/cart.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
  transaction: Transaction = new Transaction();
  cartAndItems: CartAndItems = new CartAndItems();
  cart: Cart = new Cart();
  total: number = 0
  errorMsg: string = "";
  displayStyle: string = "";
  itemUpdating: CartItem = new CartItem();
  userId: number = 0;
  intervalId: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartAndItemsService: CartAndItemsService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private cartService: CartService,
    private cartItemService: CartItemService,
    private tokenService: TokenStorageService,
    private productService: ProductService) { }

  ngOnInit(): void {
    //Line below from authService is not working.
    this.userId = this.tokenService.getUser().user_id;
    console.log(this.tokenService.getUser().user_id);
    if (this.userId <= 0) this.userId = 1; //Remove this line if not testing
    this.displayAllCarts()
  }
  displayAllCarts() {
    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe((response) => {
      this.cartAndItems = response;
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
      console.log(error);
    });
  }
  getItemsTotal(): any {
    let total = 0;
    this.cartAndItems.cartItems.forEach((value, index) => {
      total += this.calculateTotalCost(value, this.calculateDiscountedItemCost);
    });

    return total.toFixed(2);
  }

  getUserSave(): any {
    let save = 0;
    this.cartAndItems.cartItems.forEach((value, index) => {
      save += value.productAndDiscount.productCost * value.cartQty;
    });
    return (save - this.getItemsTotal()).toFixed(2)

  }

  remove(productId: number) {
    this.cartItemService.removeItemService(productId).subscribe({
      next: response => {
        this.displayAllCarts();
      },
      error: err => {
      }
    })
  }

  changeQuantity(item: ItemProductAndDiscount, event: any) {
    let newItem = new CartItem();
    newItem.cartItemId = item.cartItemId;
    newItem.cartId = item.cartId;
    newItem.productId = item.productId;
    newItem.cartQty = event.value;
    this.cartItemService.updateItemService(newItem).subscribe({
      next: response => {

        this.displayAllCarts();
      },
      error: err => {
      }
    });
  }
  proceedToCheckout() {
    this.cart.cartId = this.cartAndItems.cartId
    this.cart.userId = this.cartAndItems.userId
    this.cart.cartTotal = parseInt(this.getItemsTotal());
    this.cart.cartRemoved = true
    this.cart.cartPaid = true
    console.log(this.cart);
    console.log(this.cartAndItems);
    this.cartService.updateCartService(this.cart).subscribe((response) => {
      response;
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
    this.transaction.cartId = this.cartAndItems.cartId;
    this.transaction.transactionId = null;
    this.transaction.transactionDate = null;
    this.transactionService.sendTransaction(this.transaction).subscribe((response) => {
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
    this.updateMultiProducts();
    this.intervalId = setInterval(() => {
      this.displayStyle = "none";
      this.router.navigate(['/product']);
    }, 2000);
  }
  ngOnDestroy() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  calculateDiscountedItemCost(product: ProductAndDiscount): number {
    let cost = product.productCost;
    let discountPercentage = product.discountPercentage;
    return cost - (cost * (discountPercentage));
  }
  calculateSingleItemCost(product: ProductAndDiscount): number {
    return product.productCost;
  }
  calculateTotalSavings(product: ProductAndDiscount): number {
    let cost = product.productCost;
    let discountPercentage = product.discountPercentage;
    return cost * (discountPercentage);
  }
  calculateTotalCost(item: ItemProductAndDiscount, calcSingleItem: any) {
    return item.cartQty * calcSingleItem(item.productAndDiscount);
  }


  updateMultiProducts() {
    this.cartAndItems.cartItems.forEach((item) => {
      let tempProduct = this.toProductModel(item);
      tempProduct.productQty = tempProduct.productQty - item.cartQty;
      this.productService.updateProductsService(tempProduct).subscribe({
        next: response => {
        },
        error: err => {
        }
      })
    });
  }
  toProductModel(item: ItemProductAndDiscount) {
    let product = new Product();
    product.productId = item.productAndDiscount.productId;
    product.productCost = item.productAndDiscount.productCost;
    product.productQty = item.productAndDiscount.productQty;
    product.productSku = item.productAndDiscount.productSku;
    product.imageUrl = item.productAndDiscount.imageUrl;
    product.productCategory = item.productAndDiscount.productCategory;
    product.productDescription = item.productAndDiscount.productDescription;
    product.productName = item.productAndDiscount.productName;
    product.productRemoved = item.productAndDiscount.productRemoved;
    return product;
  }
}
