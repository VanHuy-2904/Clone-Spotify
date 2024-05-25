import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylistService', () => {
  let service: PlaylistService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
