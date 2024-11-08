import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { APIResponse, Customer } from './model/train';
import { TrainService } from './service/train.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  registerObj: Customer = new Customer();
  trainService = inject(TrainService);
  //we can also create interface(recommended)
  loginObj: any = {
    "phone": "",
    "password": ""
  };
  loggedUser: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('trainApp');
    if(localData != null) {
      this.loggedUser =  JSON.parse(localData)
    }

  }

  onLogOff() {
    this.loggedUser = new Customer();
    localStorage.removeItem("trainApp")
  }

  onRegister() {
    this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse)=>{
      if(res.result) {
        alert("Registration Success")
        this.closeRegister();
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    this.trainService.onLogin(this.loginObj).subscribe((res:APIResponse)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('trainApp', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeLogin();
      } else {
        alert(res.message)
      }
    })
  }

  openRegister() {
    const model =  document.getElementById("registerModel");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  openLogin() {
    const model =  document.getElementById("loginModel");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  closeRegister() {
    const model =  document.getElementById("registerModel");
    if(model != null) {
      model.style.display = 'none'
    }
  }
  closeLogin() {
    const model =  document.getElementById("loginModel");
    if(model != null) {
      model.style.display = 'none'
    }
  }
}
