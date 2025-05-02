import { Component } from '@angular/core';
import { MainServiceService } from '../../main-service.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../../item';


@Component({
  selector: 'app-personal',
  imports: [CommonModule, FormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  currentUser: User | null = null; // To store the current user
  password: string = '';
  username: string = '';
  successMessage: string = '';
  wishlist: Item[] = [];

constructor(private mainService: MainServiceService, private firebaseService: FirebaseConnectionService) {}

ngOnInit() {
  this.firebaseService.getCurrentUser(this.mainService.currentUser).then((user) => {
    this.currentUser = user;
    this.username = user?.username || ''; // Initialize username if user is not null
    this.password = user?.password || ''; // Initialize password if user is not null
    console.log(this.currentUser);
  });

  if(this.mainService.currentWIshlist && this.mainService.currentWIshlist.length > 0){
    this.firebaseService.fetchFeatured(this.mainService.currentWIshlist).then((items) => {
      if(items.length > 0){
        this.wishlist = items;
      }
    });
  }
}

onSubmit(){
  this.firebaseService.updateUser(this.mainService.currentUser, this.username, this.password).then((res) => {
    if(res){
      this.successMessage = 'Profile updated successfully!';
    }
  });
  }

  removeFromWishlist(itemIdRemove: string) {
    this.wishlist = this.wishlist.filter(item => item.id !== itemIdRemove);
    this.mainService.currentWIshlist = this.wishlist.map(item => item.id); // Update the current wishlist in the main service
    this.firebaseService.removeFromWishlist(this.mainService.currentUser, this.mainService.currentWIshlist).then(() => {
      });
    }

}