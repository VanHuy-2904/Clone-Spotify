import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Subscription } from 'rxjs';
import { DataService } from '../../../Service/data/data.service';
import { MusicService } from '../../../Service/music/music.service';
import { TrackDetail } from '../../../Service/music/track-detail.i';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit, OnDestroy {
  dataTrack!: TrackDetail;
  getTrackSub!: Subscription;
  private dataSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private musicService: MusicService,
  ) {}
  currentTrack!: any;
  progressPercent: number = 0;
  progressTime!: number;
  playTrue: boolean = true;
  play!: boolean;
  getCurrentTrackSub!: Subscription;
  intervalId: any;

  ngOnInit(): void {
    if (localStorage.getItem('currentPlay') === 'true') {
      this.musicService.pauseTrack().subscribe();
      localStorage.setItem('currentPlay', 'false');
    }
    setInterval(() => {
      this.progressTime = Number(localStorage.getItem('test'));
    }, 1000);

    this.musicService.playSubject.subscribe((data: boolean) => {
      this.play = data;
    });
    this.playMusic();
  }

  format(duration_ms: number) {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(duration_ms);
  }

  ngOnDestroy(): void {
    this.getTrackSub.unsubscribe();
    this.getCurrentTrackSub.unsubscribe();
  }

  handleClick() {
    if (!this.play) {
      this.musicService
        .playTrack(this.dataTrack.uri, this.progressTime)
        .subscribe(() => {});
      this.playMusic();
      localStorage.setItem('currentPlay', String(!this.play));
    } else {
     
      this.musicService.pauseTrack().subscribe(() => {});

      localStorage.setItem('currentPlay', 'false');
    }
    this.play = !this.play;
  }

  playMusic() {
    this.musicService.getData().subscribe((data) => {      
      this.getTrackSub = this.musicService
        .getTrack(data.id)
        .subscribe((trackInfo: TrackDetail) => {          
          this.dataTrack = trackInfo;
          // this.play = true;
          if (this.play) {
            setInterval(() => {
              if (this.play) {
                this.getCurrentTrackSub = this.musicService
                  .getCurrentPlaying()
                  .subscribe((data: any) => {
                    this.progressPercent = Math.floor(
                      (data.progress_ms / data.item.duration_ms) * 100,
                    );
                    this.progressTime = data.progress_ms;
                    localStorage.setItem('test', String(this.progressTime));
                  });
              }
            }, 1000);
          }
        });
    });
  }
}
