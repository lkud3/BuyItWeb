import { Component } from '@angular/core';
import { MainServiceService } from '../../main-service.service';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';
import { FirebaseConnectionService } from '../../firebase-connection.service';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-index',
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  products: Item[] = [];
  selectedProduct: Item | null = null; // To store the selected product

  constructor(private mainService: MainServiceService, private firebaseService: FirebaseConnectionService) {}

  ngOnInit() {
    this.firebaseService.fetchItems().then((pr)=>{
      this.products=pr
     })
    }


  getRoundedRating(number:number): number {
    return Math.round(number);
  }

  addToCart(item: Item, event: MouseEvent) {
    event.stopPropagation();
    this.mainService.userCart.push(item);
    console.log(this.mainService.userCart);
  }

  async onSelectProduct(product: Item) {
    product.views += 1;
    await this.firebaseService.updateProductViews(product.id, product.views);
    this.selectedProduct = product;
  }

  onBackToIndex() {
    this.selectedProduct = null; // Clear the selected product
  }
}
