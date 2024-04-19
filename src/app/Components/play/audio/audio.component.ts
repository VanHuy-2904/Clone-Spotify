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
  progressPercent: number = 0
  progressTime!: number;
  play: boolean = false;
  ngOnInit(): void {
    setInterval(() => {
      if (this.play) {
        this.musicService.getCurrentPlaying().subscribe((data: any) => {
          this.progressPercent = Math.floor(
            (data.progress_ms / data.item.duration_ms) * 100,
          );
          this.progressTime = data.progress_ms
        });
      }
    }, 1000);

    this.musicService.dataSubject.subscribe((data: any) => {
      this.getTrackSub = this.musicService
        .getTrack(data.id)
        .subscribe((trackInfo: any) => {
          this.dataTrack = trackInfo;
          this.play = true;
        });
    });
  }

  format(duration_ms: number) {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(duration_ms);
  }

  ngOnDestroy(): void {
    this.getTrackSub.unsubscribe();
  }

  handleClick() {
    if (!this.play) {
      this.musicService
        .playTrack(this.dataTrack, this.currentTrack.progress_ms)
        .subscribe(() => {});
    } else {
      this.musicService.getCurrentPlaying().subscribe((data) => {
        this.currentTrack = data;
      });
      this.musicService.pauseTrack().subscribe(() => {});
    }
    this.play = !this.play;
  }
}
