import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AudioComponent } from '../../Components/play/audio/audio.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { AuthService } from '../../Service/auth/Auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, AudioComponent, HeaderComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent{
  
}
