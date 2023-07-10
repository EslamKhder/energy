import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../../service/cart-service.service';
import {AuthenticationServiceService} from '../../service/security/authentication-service.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

  orderSize: number = 0;
  orderPrice: number = 0;
  srcc: string = '';
  name: string = '';
  price : number = 0;

  constructor(private cart: CartServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.srcc = this.route.snapshot.paramMap.get('src')
    this.name = this.route.snapshot.paramMap.get('name')
    this.price = Number(this.route.snapshot.paramMap.get('price'))
  }


  timeLeft: number = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft++;
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    let result1 = this.route.snapshot.paramMap.get('id');
    alert("Time is : " + this.timeLeft)

    this.auth.addDevice(this.name, this.timeLeft,((this.timeLeft / 60) * this.price), sessionStorage.getItem('email')).subscribe({
      next: response=> {

      },
      error: error =>{
      }
    })
    alert("your price is : " + ((this.timeLeft / 60) * 6))

    this.router.navigateByUrl("/energy")
  }

  isUserLogin(){
    return this.auth.isLogin()
  }

}
