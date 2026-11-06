import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private localStorageKey = 'angular_items_db';

  constructor() {
    // Initialize local storage with dummy data if empty
    if (!localStorage.getItem(this.localStorageKey)) {
      const initialData: Item[] = [
        { id: '1', name: 'Sample Item A', description: 'High quality gadget', price: 29.99 },
        { id: '2', name: 'Sample Item B', description: 'Useful utility tool', price: 9.99 }
      ];
      this.saveToStorage(initialData);
    }
  }

  private getFromStorage(): Item[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(items: Item[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  getItems(): Item[] {
    return this.getFromStorage();
  }

  getItemById(id: string): Item | undefined {
    return this.getFromStorage().find(item => item.id === id);
  }

  addItem(item: Item): void {
    const items = this.getFromStorage();
    item.id = Date.now().toString(); // Generate simple unique ID
    items.push(item);
    this.saveToStorage(items);
  }

  updateItem(updatedItem: Item): void {
    let items = this.getFromStorage();
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    this.saveToStorage(items);
  }

  deleteItem(id: string): void {
    let items = this.getFromStorage();
   // items = items.filter(item => item.id !== id);
    items = items.filter(item => String(item.id) !== String(id));
    console.log(items, id)
    this.saveToStorage(items);
    console.log(items, id)
  }
}
