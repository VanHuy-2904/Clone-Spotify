import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auth/auth.service';
import { tap } from 'rxjs';

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
    this.route.queryParams.subscribe((codes: any) => {
      const code = codes['code'];
      if (code) {
        this.handleCodeExchange(code);
      }
    });
  }
  handleCodeExchange(code: string): void {
    this.authService.exchangeCode(code).subscribe({
      next: (data: any) => {
        this.authService.setToken(data.access_token);
        this.authService  
          .getUserinfo(data.access_token)
          .subscribe((dataUser: any) => {
            localStorage.setItem('nameUser', dataUser.display_name);
            this.router.navigate(['/']);
          });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
