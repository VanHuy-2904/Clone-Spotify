import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TopTrack } from '../data/top-track.i';
import { Playlist } from '../playlist/playlist.i';
import { Search } from './search.i';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private inputValue$ = new BehaviorSubject('');
  data$ = this.inputValue$.asObservable();

  private searchB$ = new BehaviorSubject<boolean>(false);
  searchB = this.searchB$.asObservable();
  constructor(private http: HttpClient) {}

  setInputValue(input: string) {
    this.inputValue$.next(input);
  }

  getInput() {
    return this.data$;
  }

  setSearchB(input: boolean) {
    this.searchB$.next(input);
  }

  getSearchB(): Observable<boolean> {
    return this.searchB;
  }

  getFeature(): Observable<Playlist> {
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.topTrack,
    );
  }

  searchRS(input: string, type: string): Observable<Search> {
    return this.http.get<Search>(
      environment.apiConfig + environment.apiPaths.search(input, type),
    );
  }

  getTrackRS(id: string): Observable<TopTrack> {
    return this.http.get<TopTrack>(
      environment.apiConfig + environment.apiPaths.getTrackArtist(id),
    );
  }
}
