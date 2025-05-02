import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor() { }

  currentUser: string = '';
  currentWIshlist: string[] = [];
  userCart: Item[] = [];
  items: Item[] = [];
}
