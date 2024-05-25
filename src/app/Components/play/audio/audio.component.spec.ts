import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioComponent } from './audio.component';
import { HttpClientModule } from '@angular/common/http';

describe('AudioComponent', () => {
  let component: AudioComponent;
  let fixture: ComponentFixture<AudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
