import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-info-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-info-playlist.component.html',
  styleUrl: './edit-info-playlist.component.scss',
})
export class EditInfoPlaylistComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  isVisible: boolean = false;
  @Input() imgUrl: string = '';
  @Input() playlistName!: string;
  @Output() playlistUpdateData = new EventEmitter<string>();
  imgBackup = '';
  isInput: boolean = false;
  isLoading: boolean = false;
  isImageChange: boolean = false;
  paramsSubscription!: Subscription;
  idPlaylist: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if (code) this.idPlaylist = code;
    });
  }

  openModal() {
    this.isVisible = true;
    this.editForm = this.formBuilder.group({
      name: [this.playlistName, Validators.required],
      description: [''],
      img: [this.imgUrl],
    });
  }

  closeModal() {
    this.isVisible = false;
    this.playlistUpdateData.emit();
    if (this.imgBackup) this.imgUrl = this.imgBackup;
  }

  clickInput() {
    const file = document.getElementById('fileImg');
    file?.click();
  }

  onSubmit() {
    if (this.editForm.value.name) {
      this.playlistService
        .updateInfoPlaylist(
          this.idPlaylist,
          this.editForm.value.name,
          this.editForm.value.description,
        )
        .subscribe({
          next: () => {
            const namePlaylistNew = this.editForm.value.name;
            if (this.isImageChange) {
              this.isLoading = true;
              this.imgUrl = this.imgUrl.replace(
                /^data:image\/(png|jpeg);base64,/,
                '',
              );
              this.playlistService
                .updateImgPlaylist(this.idPlaylist, this.imgUrl)
                .subscribe(() => {
                  this.isLoading = false;
                  this.closeModal();
                  this.imgBackup = '';
                  this.playlistUpdateData.emit(namePlaylistNew);
                });
              this.isImageChange = false;
            } else {
              this.closeModal();
              this.playlistUpdateData.emit(this.editForm.value.name);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImgChange(event: any) {
    this.imgBackup = this.imgUrl;
    const file: File = event.target.files[0];
    if (file) {
      if (file.size < 256 * 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Image = reader.result as string;
          this.imgUrl = base64Image;
          this.isImageChange = true;
        };
      } else {
        alert('Vui lòng chọn file không vượt quá 256kb');
      }
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
