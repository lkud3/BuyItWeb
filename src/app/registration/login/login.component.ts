import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { MainServiceService } from '../../main-service.service';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage!: string;

  @Output() toggle = new EventEmitter<void>();
  @Output() loginsuccessful = new EventEmitter<void>(); 

  constructor(private firebaseService: FirebaseConnectionService, private mainService: MainServiceService) {}

  async onSubmit() {
    let userId!: string;
    let users=await this.firebaseService.fetchUsers()
    for (const user of users) {
      if (user.username === this.username && user.password === this.password) {
        userId = user.id;
        console.log(`Login successful for user ID: ${userId}`);
        
        
        this.mainService.currentUser = userId;
        this.mainService.currentWIshlist = user.wishlist;
        console.log(this.mainService.currentWIshlist);
        this.loginsuccessful.emit();
        break;
      }
    }

    if (!userId) {
      console.error('Invalid email or password.');
      this.errorMessage = 'Invalid email or password.';
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
