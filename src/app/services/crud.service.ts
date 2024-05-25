import { Injectable } from '@angular/core';
import { Signal, signal } from '@angular/core';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class CrudService {


  defaultUsers: User[] = [
    {
      id: 1,
      firstName: 'Booshna',
      lastName: 'Arthy',
      email: 'booshna012@gmail.com',
      mobile: '9019019209',
      profilePicture: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      firstName: 'Arthy',
      lastName: 'Daivik',
      email: 'booshna012@gmail.com',
      mobile: '9019019209',
      profilePicture: 'https://via.placeholder.com/50'
    }
  ];

  private usersList = signal<User[]>(this.defaultUsers);

  addUser(newUser: User): void {
    const users = this.usersList();
    //To find last user id in list and add 1 with it to add new user
    const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
    const userWithId = { ...newUser, id: maxId + 1 };
    this.usersList.update(users => [...users, userWithId]);
  }

  getUsers() {
    return this.usersList();
  }

  updateUser(updatedUser: User) {
    this.usersList.update(users =>
      users.map(user => user.id === updatedUser.id ? { ...user, ...updatedUser } : user)
    );
  }

  deleteUser(id: number) {
    this.usersList.update(users => users.filter(task => task.id !== id));
    this.reassignIds();
  }

  //when delete users, reassigning ids
  reassignIds(): void {
    let idCounter = 1;
    this.usersList.update(users => users.map(user => ({ ...user, id: idCounter++ })));
  }

}


