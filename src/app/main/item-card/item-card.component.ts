import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../../review';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { User } from '../../user';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item_card_id: Item = {} as Item;
  @Output() backToIndex = new EventEmitter<void>();

  reviews: Review[]=[];
  users: User[] = [];
  rating: number = 0;

  constructor(private firebaseService: FirebaseConnectionService){}

  ngOnInit() {
    this.firebaseService.fetchReviews(this.item_card_id.id).then((reviews)=>{
      this.reviews=reviews;
      const userIds = Array.from(new Set(reviews.map(review => review.userId)));

      this.firebaseService.fetchUsers().then((users) => {
        this.users = users.filter(user => userIds.includes(user.id));
      });
     });
  }

  onBack() {
    this.backToIndex.emit();
  }

  async rateProduct(star: number) {
    this.rating = star; // Set the selected rating
    console.log(`User  rated the product: ${this.rating} star(s)`);
    this.item_card_id.rateCount += 1; 
    this.item_card_id.rating = (this.item_card_id.rating * (this.item_card_id.rateCount - 1) + this.rating) / this.item_card_id.rateCount; // Update the average rating
    await this.firebaseService.updateProductRate(this.item_card_id.id, this.item_card_id.rating, this.item_card_id.rateCount);
  }

}
