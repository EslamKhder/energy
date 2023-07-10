import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SpaceValidator} from '../../model/space-validator';
import {AuthenticationServiceService} from '../../service/security/authentication-service.service';
import {Router} from '@angular/router';
import {CartOrder} from "../../model/cart-order";
import {CartServiceService} from "../../service/cart-service.service";
import {Device} from "../../model/device";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [
    './reset-password.component.css',
    '../../../assets/css/login-signup.css'
  ]
})
export class ResetPasswordComponent implements OnInit {
  orders: CartOrder[] = [];
  totalOrder: number = 0;
  totalPrice: number = 0;
  devices: Device[] = [];
  constructor(private cart: CartServiceService,
              private auth: AuthenticationServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.auth.getDevice(sessionStorage.getItem('email')).subscribe({
      next: response=> {
        this.devices = response
      },
      error: error =>{
      }
    })
    this.getAllOrders()
    this.getTotals()
    this.cart.calculateTotals()
  }

  getTotals(){
    this.cart.totalOrders.subscribe(
      data => {
        this.totalOrder = data
      }
    )
    this.cart.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )
  }
  getAllOrders(){
    this.orders = this.cart.orders;
  }

  addOrder(temp: CartOrder) {
    this.cart.addOrderToCart(temp)
  }

  removeOrder(temp: CartOrder) {
    this.cart.removeOrder(temp)
  }

  remove(temp: CartOrder) {
    this.cart.remove(temp)
  }

  checkOut() {
    this.router.navigateByUrl('/checkout')
  }
  isAuthenticatedUser(){
    return this.auth.isLogin();
  }

  logOut() {
    this.auth.logOut()
    this.router.navigateByUrl('/login')
  }
}
