import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlaylistComponent } from './my-playlist.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('MyPlaylistComponent', () => {
  let component: MyPlaylistComponent;
  let fixture: ComponentFixture<MyPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MyPlaylistComponent,
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
