import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auths/auth.service';

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
    private authService: AuthService,
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
    this.authService.exchangeCode(code).subscribe(
      (data) => {
        console.log('exchange code: ', data);
        this.authService.setToken(data.access_token);
        console.log(localStorage.getItem('token'));
        this.authService.getUserinfo(data.access_token).subscribe((dataUser) => {
          console.log(dataUser);
          
          localStorage.setItem('nameUser', dataUser.display_name);
          console.log(localStorage.getItem('nameUser'));
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.log(error);
      },  
    );
  }
}
