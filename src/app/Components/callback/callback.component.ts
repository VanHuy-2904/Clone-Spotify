import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auth/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((codes: { [key: string]: string }) => {
      const code = codes['code'];
      if (code) {
        this.handleCodeExchange(code);
      }
    });
  }
  handleCodeExchange(code: string): void {
    this.authService.exchangeCode(code).subscribe({
      next: (data: { access_token: string }) => {
        this.authService.setToken(data.access_token);
        this.authService
          .getUserinfo()
          .subscribe((dataUser: { display_name: string }) => {
            localStorage.setItem('nameUser', dataUser.display_name);
            this.router.navigate(['/']);
          });
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
