import { RouterTestingModule } from '@angular/router/testing';
import { CartAndItemsService } from './../../services/cart-and-items.service';
import { CartItem } from './../../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutComponent } from './checkout.component';
import { CartAndItems } from 'src/app/models/cart.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
//Assert
describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartItemService: CartItemService;
  let cartService: CartService;
  let cartAndItemsService: CartAndItemsService;
  let transactionService: TransactionService;
  let productService: ProductService;
  let router: Router;
  let activateRoute: ActivatedRoute;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let expectedReq: CartAndItems;

  //Dummy data to be returned by request.
  expectedReq =
  {
    "cartId": 1,
    "userId": 1,
    "cartTotal": 5424,
    "cartPaid": true,
    "cartRemoved": true,
    "cartItems": [
      {
        "cartItemId": 1,
        "cartId": 1,
        "productId": 1,
        "cartQty": 1,
        "productAndDiscount": {
          "productId": 1,
          "productSku": "A0XB34XBOX00234",
          "productName": "Xbox One",
          "productCost": 199.99,
          "productCategory": "Gaming Consoles",
          "productDescription": "Xbox One. Rated #1 by gamers worldwide.",
          "productQty": 9,
          "imageUrl": "https://media.istockphoto.com/photos/xbox-one-picture-id472044719?k=20&m=472044719&s=612x612&w=0&h=CXhGzWN2fZsw0IrHMbYc6kShj1klOkfkmLcHeD4Nopw=",
          "productRemoved": false,
          "discountId": -1,
          "discountDescription": "N/A",
          "discountPercentage": 0.0
        }
      },
      {
        "cartItemId": 2,
        "cartId": 1,
        "productId": 2,
        "cartQty": 5,
        "productAndDiscount": {
          "productId": 2,
          "productSku": "A0XB34GPHONE00234",
          "productName": "iPhone 13 Pro",
          "productCost": 1099.99,
          "productCategory": "Phones",
          "productDescription": "Lastest Model - 6.7 inch display",
          "productQty": 15
          ,
          "imageUrl": "https://media.istockphoto.com/photos/newly-released-iphone-13-pro-mockup-set-with-back-and-front-angles-picture-id1356372494?k=20&m=1356372494&s=612x612&w=0&h=4IyK75PK9dd4zY-CPAF_scPK-HwsoYS2mmWJZzBwp2A=",
          "productRemoved": false,
          "discountId": 1,
          "discountDescription": "stuff",
          "discountPercentage": 0.05
        }
      }
    ]// as unknown as CartAndItemsService[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CartItemService,
        CartService,
        CartAndItemsService,
        TransactionService,
        ProductService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activateRoute = TestBed.inject(ActivatedRoute);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('display All Carts on Service method', () => {
    const displayservice: CartAndItemsService = TestBed.get(CartAndItemsService);
    let displayAll = spyOn(displayservice, 'getCartAndItemsWithUserIdService').and.returnValue(of(expectedReq)); // rule

    component.displayAllCarts();
    expect(component.cartAndItems).toEqual(expectedReq);

    // const mySpy = jasmine.createSpyObj('', ['myCart']);
    // mySpy.myCart.and.returnValue(expectedReq);
    // expect(mySpy.myCart()).toBe('', 'wrong data')

    // expect(displayservice.getCartAndItemsWithUserIdService).toBe(expectedReq),
    //   fail

  });

  afterEach(() => {
    //httpTestingController.verify(); //Verifies that no requests are outstanding.
    httpTestingController.expectOne("http://localhost:7777/api/cart-and-items/user/undefined").flush(null, { status: 200, statusText: 'Ok' });// closing the request
  });

});
















    //     it('display All Carts on Service method', () => {
    //       // let cartItemService = fixture.debugElement.injector.get(CartItemService);
    //       // let displayAll = spyOn(cartItemService, 'getCartAndItemsWithUserIdService').withArgs({}).and.returnValue(of('mock result data'))


    //     const displayservice: CartItemService = TestBed.get(CartItemService);
    //     let displayAll = spyOn(displayservice, 'getCartAndItemsWithUserIdService').withArgs({})
    //       .and.returnValue(of('mock result data'))

    //     displayservice.getCartAndItemsWithUserIdService({}).subscribe((data: CartItemService) => {
    //       console.log("called")
    //       expect(data).toEqual(expectedReq, 'mock result data'));

    //     expect(displayservice.getCartAndItemsWithUserIdService).toHaveBeenCalled();

    //   });


    // });









