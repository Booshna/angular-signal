import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { FormComponent } from '../form/form.component';
import { User } from '../user';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  //del confirmation modal
  @ViewChild('confirmationModal') confirmationModal: any;

  list: User[] = [];
  userIdToDelete: number | undefined;
  displayStyle: string = 'none';

  constructor(private crudService: CrudService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list = this.crudService.getUsers();
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      data: user
    });

    //Fetch user list while closing form dialog
    dialogRef.afterClosed().subscribe(() => {
      this.list = this.crudService.getUsers();
    });
  }

  confirmDeleteUser(userId: number): void {
    this.userIdToDelete = userId;
    this.openModal();
  }

  openModal(): void {
    this.displayStyle = 'block'
  }

  closeModal(): void {
    this.displayStyle = 'none'
  }

  //del user by id
  deleteUser() {
    if (this.userIdToDelete != null) {
      this.crudService.deleteUser(this.userIdToDelete);
      this.closeModal();
    }
    this.list = this.crudService.getUsers();
  }


}
