import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { User } from '../user';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  user: User;

  constructor(
    private crudService: CrudService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    //get user data in fields during edit or empty fields for add.
    this.user = data ? { ...data } : { id: 0, firstName: '', lastName: '', email: '', mobile: '', profilePicture: '' };
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.user.id != 0) {
      this.crudService.updateUser(this.user);
    } else {
      this.crudService.addUser(this.user);
    }
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.profilePicture = reader.result as string;
      };
    }
  }
}


