import {
  AfterViewInit,
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AudioComponent } from '../../Components/play/audio/audio.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { AuthService } from '../../Service/auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, AudioComponent, HeaderComponent, CommonModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent{
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const headerElement = document.querySelector('.topbar')
    const main = document.querySelector('.main')
    if(main?.scrollTop && main?.scrollTop > 0){      
      headerElement?.classList.add('scrolled')
    }
    else 
      headerElement?.classList.remove('scrolled')
  }
}
