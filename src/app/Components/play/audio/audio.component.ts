import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options, SliderComponent } from 'ngx-slider-v2';
import { AuthService } from '../../../Service/auth/auth.service';
import { MusicService } from '../../../Service/music/music.service';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../../../Service/music/track';
import { DataService } from '../../../Service/data/data.service';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit, OnDestroy {
  dataTrack = new Track();
  getTrackSub!: Subscription;
  private dataSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private musicService: MusicService,
  ) {}
  currentTrack: any;
  play: boolean = false;
  ngOnInit(): void {}

  format(duration_ms: number) {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(duration_ms);
  }

  ngOnDestroy(): void {
    this.getTrackSub.unsubscribe();
  }

  handleClick() {
    this.play = !this.play;
  }
}
