import { Component } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AudioComponent } from '../../Components/play/audio/audio.component';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, AudioComponent, HeaderComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
