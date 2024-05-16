import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-info-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-info-playlist.component.html',
  styleUrl: './edit-info-playlist.component.scss',
})
export class EditInfoPlaylistComponent {
  @Input() show: boolean = false;
  closeEdit() {
    this.show = false;
  }
}
