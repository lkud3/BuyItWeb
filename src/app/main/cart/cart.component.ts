import { Component } from '@angular/core';
import { MainServiceService } from '../../main-service.service';
import { CommonModule } from '@angular/common';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../../item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
userCart: Item[] = [];

constructor(private mainService: MainServiceService, private firebaseService: FirebaseConnectionService) {}

ngOnInit() {
  this.userCart = this.mainService.userCart || []; // Initialize userCart with the current cart from the main service
}

removeFromCart(itemToRemove: Item){
  this.userCart = this.userCart.filter(item => item.id !== itemToRemove.id);
  this.mainService.userCart = this.userCart; // Update the current cart in the main service
}

get originalTotalPrice(): number {
  return this.userCart.reduce((sum, item) => sum + item.price, 0);
}

// Method to calculate the total price with discount
get totalPrice(): number {
  const discountThreshold = 100;
  const discountRate = 0.1; // 10% discount

  if (this.originalTotalPrice > discountThreshold) {
    return this.originalTotalPrice * (1 - discountRate); // Apply discount
  }
  return this.originalTotalPrice; // No discount
}
}
