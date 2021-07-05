import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profileForm : FormGroup;
  uploadFile: File;

  constructor(
    private fb :FormBuilder,
    private userSrv : UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.userSrv.loadUser().subscribe(user => {
      this.profileForm = this.fb.group({
        displayName : new FormControl(user.displayName),
        email: new FormControl(user.email)
      })
    })
  }

  onUpload(event) {
    console.log(event);
    this.messageService.add({ key: 'bc',severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onSubmit() : void {
    this.userSrv.updateUser(this.profileForm.value).pipe(
      tap(result => {
        this.messageService.add({ key: 'bc',severity: 'info', summary: 'Profil mis à jour', detail: ''})
      })
      ).subscribe()
  }

}
