import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../../Service/auth/auth.service';
import { SearchService } from '../../Service/search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string | null;
  accessToken: string;
  searchValue = '';
  name$!: Observable<string>;
  token: string | null = null;
  showCt: boolean = false;
  constructor(
    private authService: AuthService,
    private searchService: SearchService,
  ) {
    this.name = '';
    this.accessToken = '';

    this.name$ = this.authService.userName$.pipe(
      map((oldName) => `test ${oldName}`),
    );
  }

  test = 1;
  test2 = 2;
  exchangeCodeSub!: Subscription;
  handleClick() {
    this.showCt = !this.showCt;
  }

  countTest() {
    console.log('aaaaa');
    return this.test + this.test2;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  onInputChange(event: any) {
    this.searchService.setInputValue(this.searchValue);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('nameUser');
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  // onInputChange(event: any) {
  //   this.searchService.setInputValue(this.searchValue);
  // }
}
