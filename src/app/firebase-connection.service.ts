import { Injectable } from '@angular/core';
import { User } from './user';
import { Item } from './item';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectionService {

  private firebaseEndpoint = 'https://cs-306-buyitweb-default-rtdb.europe-west1.firebasedatabase.app/';
  private photoUrl = 'https://firebasestorage.googleapis.com/v0/b/cs300-buyit.appspot.com/o/';

  users:User[] = [];
  items: Item[] = []
  reviews: Review[] = [];
  currentUser: User | null = null; 

  constructor() { }

  async fetchUsers() {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Users.json`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      this.users = Object.keys(data).map(key => ({ 
        id: key, 
        username: data[key].username,
        password: data[key].password,
        thumbnail: this.photoUrl + data[key].image,
        wishlist: data[key].favorites
       }));
      console.log(this.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      this.users = []; // Reset users in case of error
    }

    return this.users
  }

  async getCurrentUser(userId: string) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Users/${userId}.json`);
      if (!response.ok) throw new Error('Failed to fetch current user');
      const data = await response.json();
      this.currentUser = {
        id: userId,
        username: data.username,
        password: data.password,
        thumbnail: this.photoUrl + data.image,
        wishlist: data.favourites
      };
      console.log(this.currentUser);
    } catch (error) {
      console.error('Error fetching current user:', error);
      this.currentUser = null; // Reset user in case of error
    }

    return this.currentUser
  }

  async updateUser(userId:string, newUsername: string, newPassword: string){
    try {
      const response = await fetch(`${this.firebaseEndpoint}Users/${userId}.json`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword}) // Update the views count
      });
      if (!response.ok) throw new Error('Failed to update user');
      console.log(`Updated credentials for user ${userId}`);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  async fetchItems() {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Stock.json`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      this.items = Object.keys(data).map(key => ({ 
        id: key,  
        description: data[key].description,
        images: data[key].image.map((ph: string) => this.photoUrl + ph),
        location: data[key].location,
        name: data[key].name,
        views: data[key].views,
        price: data[key].price,
        rating: data[key].rating.averageRate,
        rateCount: data[key].rating.rateCount
       }));
      console.log(this.items);
    } catch (error) {
      console.error('Error fetching items:', error);
      this.items = []; // Reset items in case of error
    }

    return this.items
  }

  async fetchFeatured(itemsId: string[]) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Stock.json`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      const allItems = Object.keys(data).map(key => ({ 
        id: key,  
        description: data[key].description,
        images: data[key].image.map((ph: string) => this.photoUrl + ph),
        location: data[key].location,
        name: data[key].name,
        views: data[key].views,
        price: data[key].price,
        rating: data[key].rating.averageRate,
        rateCount: data[key].rating.rateCount
       }));

       const favitems = allItems.filter(item => itemsId.includes(item.id));
       return favitems; 
    } catch (error) {
      console.error('Error fetching items:', error);
      return []; // Reset items in case of error
    }
  }

  async removeFromWishlist(userId: string, wishlist: string[]) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Users/${userId}.json`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites: wishlist }) 
      });
      if (!response.ok) throw new Error('Failed to update user');
      console.log(`Updated favorites for user ${userId}`);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  async fetchReviews(itemId: string) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Comments/${itemId}.json`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
        const data = await response.json();
        if(data){
        this.reviews = Object.keys(data).map(key => ({ 
          id: key,  
          comment: data[key].comment,
          date: data[key].date,
          userId: data[key].userid,
        }));
        console.log(this.reviews);
      }
      else{
        this.reviews = []; // Reset reviews if no data found
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      this.reviews = []; // Reset reviews in case of error
    }

    return this.reviews
  }

  async addUser(newUsername: string, newPassword: string) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Users.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          image: "login.png?alt=media&token=626c4fef-e45e-46b7-b847-c4a7b00cb044",
          favourites: [""]
        })
      });
      if (!response.ok) throw new Error('Failed to add user');
      let data = await response.json();
      console.log('User added:', data.name);
      return data.name; // Return the ID of the newly created user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async updateProductViews(productId: string, views: number) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Stock/${productId}.json`, {
        method: 'PATCH', // Use PATCH to update only the views field
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ views: views }) // Update the views count
      });
      if (!response.ok) throw new Error('Failed to update views');
      console.log(`Updated views for product ${productId}: ${views}`);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  }

  async updateProductRate(productId: string, rating: number, rateCount: number) {
    try {
      const response = await fetch(`${this.firebaseEndpoint}Stock/${productId}.json`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: {averageRate: rating, rateCount:rateCount }}) // Update the views count
      });
      if (!response.ok) throw new Error('Failed to update views');
      console.log(`Updated rating for product ${productId}: ${rating}`);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  }
}
