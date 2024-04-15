import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((codes: any) => {
      const code = codes['code'];
      if (code) {
        this.handleCodeExchange(code);
      }
    });
  }
  handleCodeExchange(code: string): void {
    this.authservice.exchangecode(code).subscribe(
      (data) => {
        console.log('exchange code: ', data);
        this.authservice.setToken(data.access_token);
        console.log(localStorage.getItem('token'));
        this.authservice.getuserinfo(data.access_token).subscribe((dataUser) => {
          console.log(dataUser);
          
          localStorage.setItem('nameuser', dataUser.display_name);
          console.log(localStorage.getItem('nameuser'));
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.log(error);
      },  
    );
  }
}
