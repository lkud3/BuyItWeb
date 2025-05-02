import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { MainServiceService } from '../../main-service.service';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reg',
  imports: [FormsModule, CommonModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {
  username: string = '';
  password: string = '';
  errorMessage!: string;

  @Output() toggle = new EventEmitter<void>();
  @Output() loginsuccessful = new EventEmitter<void>(); 

  constructor(private firebaseService: FirebaseConnectionService, private mainService: MainServiceService) {}

  async register() {
    let userId!: string;
    userId=await this.firebaseService.addUser(this.username, this.password);
    if (userId) {
      console.log(`Login successful for user ID: ${userId}`);
      
      this.mainService.currentUser = userId;
      this.loginsuccessful.emit();
    }
    else{
      console.error('Something is wrong.');
      this.errorMessage = 'Something is wrong. Try again.';
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
