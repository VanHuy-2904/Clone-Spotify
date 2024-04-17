import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Renderer2
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
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
  accessToken: any;
  searchValue = '';
  name$!: Observable<string>;
  token: any;
  showCt: boolean = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2,
    private searchService: SearchService,
  ) {
    this.name = '';
    this.accessToken = '';
    this.name$ = this.authService.userName$.pipe(
      map((oldName) => `test ${oldName}`),
    );
  }
  data: any[] = [];

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
  onInputChange(event: any) {
    this.searchService.setInputValue(this.searchValue);
  }

  ngOnInit(): void {
    // this.name = 'a'
    this.name = localStorage.getItem('nameUser');
    console.log(localStorage.getItem('nameUser'));
    
    this.token = localStorage.getItem('token');
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
