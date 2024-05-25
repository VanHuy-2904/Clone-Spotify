import { TestBed } from '@angular/core/testing';

import { MusicService } from './music.service';
import { HttpClientModule } from '@angular/common/http';

describe('MusicService', () => {
  let service: MusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
