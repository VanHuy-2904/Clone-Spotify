import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPlaylistComponent } from './edit-info-playlist.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('EditInfoPlaylistComponent', () => {
  let component: EditInfoPlaylistComponent;
  let fixture: ComponentFixture<EditInfoPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditInfoPlaylistComponent,
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInfoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
