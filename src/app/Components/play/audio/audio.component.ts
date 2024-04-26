import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Track } from '../../../Service/music/track';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent {
  data: Track[] = [];

  constructor() {}

  play: boolean = false;

  handleClick() {
    this.play = !this.play;
    console.log(this.play);
  }
}
