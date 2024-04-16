import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth/Auth.service';
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

  constructor(private authService: AuthService) {
    this.signup = new SignUp()
  }


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
