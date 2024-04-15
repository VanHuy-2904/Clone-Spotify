import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
import { Observable, Subscribable, Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchSerive } from '../../Service/Search/search.service';

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
  searchvalue = '';
  name$!: Observable<string>;
  token: any;
  showCt: boolean = false;
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2,
    private searchservice: SearchSerive,
  ) {
    this.name = '';
    this.accessToken = '';
    this.name$ = this.authservice.userName$.pipe(
      map((oldName) => `test ${oldName}`),
    );
  }
  data: any[] = [];

  test = 1;
  test2 = 2;
  exchangcodeSub!: Subscription;
  handleClick() {
    this.showCt = !this.showCt;
  }

  countTest() {
    console.log('aaaaa');
    return this.test + this.test2;
  }

  ngOnInit(): void {
    // this.name = 'a'
    this.name = localStorage.getItem('nameuser');
    this.token = localStorage.getItem('token');
  }
  login() {
    this.authservice.login();
  }
  logout() {
    this.authservice.logout();
  }
  onInputChange(event: any) {
    this.searchservice.setinputvalue(this.searchvalue);
  }
}
