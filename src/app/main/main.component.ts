import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { IndexComponent } from "./index/index.component";
import { PersonalComponent } from "./personal/personal.component";
import { CartComponent } from "./cart/cart.component";
import { CommonModule } from '@angular/common';
import { Item } from '../item';

@Component({
  selector: 'app-main',
  imports: [IndexComponent, PersonalComponent, CartComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  currentTab: string = 'index';
  userCart: Item[] = [];
  item_card_id: string = '';

  constructor(private mainService: MainServiceService) {}

  ngOnInit() {
    this.userCart = this.mainService.userCart;
  }

  switchTab(tab: string) {
    this.currentTab = tab;
  }
}
