import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { FormComponent } from '../form/form.component';
import { User } from '../user';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  list: User[] = [];

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

  //del user by id
  deleteUser(id: number) {
    this.crudService.deleteUser(id);
    this.list = this.crudService.getUsers();
  }


}
