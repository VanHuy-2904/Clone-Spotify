import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  client_id = '87ac444283e74b2caa2a9be4134a8d67';
  client_secret = '0b8b21dbb9d84255ad0c94681ae3d56e';
  redirect_uri = 'http://localhost:4200';
  scope = 'user-read-private user-read-email';
  state = '123';
  accessToken: any;
  constructor(private AuthService: AuthService) {
    this.accessToken = '';
  }

  Login() {
    this.AuthService.login();
  }
}
// loginObj: Login;

// constructor(private authservice: AuthService) {
//   this.loginObj = new Login();
// }

// Login() {
//   this.authservice.onLogin(this.loginObj);
//   // debugger
// }

// export class Login {
//   email: string;
//   password: string;
//   constructor() {
//     this.email = "";
//     this.password = ""
//   }

// }
