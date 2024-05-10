import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  search: boolean = false
  showCt: boolean = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private searchService: SearchService,
    private router: Router,
    private renderer: Renderer2,
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


  onInputChange(event: Event) {
    this.searchService.setInputValue(this.searchValue);
  }

  ngOnInit(): void {
  
    this.searchService.getSearchB().subscribe((data)=> {
      if(data) {          
        this.search = true
      }
      else {
        this.search = false
      }
    })
    
    // console.log(this.searchService.get);
    
      console.log(this.search);
      
    
    // this.name = 'a'
    this.authService.getUser().subscribe((data: any) => {
      console.log(data);
      
    })
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

  goBack(): void {
    window.history.back();

  }

  goForward(): void {
    window.history.forward();
  }

 
 

  
}
