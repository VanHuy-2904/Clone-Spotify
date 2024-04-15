import { Component } from '@angular/core';
import { AuthService } from '../../Service/Auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signup: SignUp

  constructor(private authservice: AuthService) {
    this.signup = new SignUp()
  }

  // SignUp() {
  //   this.authservice.resgiter(this.signup)
  // }
}


export class SignUp {
  name: string;
  email: string;
  password: string

  constructor() {
    this.name = "";
    this.email = ""
    this.password = ""
  }
}
