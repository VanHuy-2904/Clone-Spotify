import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchSerive } from '../../Service/Search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  name: string | null;
  accessToken: any
  searchvalue = ''
  name$!: Observable<string>
  constructor(private authservice: AuthService, private route: ActivatedRoute, private http: HttpClient, private renderer: Renderer2, private searchservice: SearchSerive
    ) {
   this.name = ""
   this.accessToken = ""
   this.name$ = this.authservice.userName$.pipe(map(oldName => `test ${oldName}`));
  }

  test = 1;
  test2 = 2;

  countTest() {
    console.log("aaaaa")
    return this.test + this.test2
  }

  ngOnInit(): void {
    this.onInputChange(this.searchvalue)
    this.exchangcode();
    // this.checkScroll();
    this.authservice.getuserinfo(localStorage.getItem('token')).subscribe((data:any) => {
  
      this.name = data.display_name
 
      
      localStorage.setItem('nameuser', data.display_name)
    })

   

    
}

exchangcode() {
  this.route.queryParams.subscribe(params => {
    const code = params['code'];
    if(code) {
      this.authservice.exchangecode(code).subscribe((data: any)=> {
        
        this.authservice.accessToken = data.access_token
        console.log(123);
        this.authservice.accessToken = data.access_token
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        
        // this.refresh_token = data.refresh_token
      })
      console.log(this.authservice.accessToken);
      
    }
  });
}

  logout() {
    this.authservice.logout()
  }
  onInputChange(event: any) {
   this.searchservice.setinputvalue(this.searchvalue)
  }
}
