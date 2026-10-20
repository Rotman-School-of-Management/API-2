import { Component, signal } from '@angular/core';
import {  UserDataComponent } from './user-data/user-data';
import {  TodoDataComponent } from './todo-data/todo-data';
import {  PhotoDataComponent } from './photo-data/photo-data';
import {  AlbumDataComponent } from './album-data/album-data';
import {  CommentDataComponent } from './comment-data/comment-data';
@Component({
  selector: 'app-root',
  imports: [ UserDataComponent,  PhotoDataComponent],
  styleUrl: './app.css',
   template: 
   
 
   
   `   <!-- Static Heading -->
    <h1>Data Fetched from API</h1>
   <div class="tabs-header">
     <button (click)="setTab('Photos')" [class.active]="activeTab === 'Photos'">Photos</button>
     <button (click)="setTab('Users')" [class.active]="activeTab === 'Users'">Users</button>
</div>

<div class="tabs-body">
  @if (activeTab === 'Photos') {
    <div>
      <h2>Photos</h2>
      <p><app-photo-data></app-photo-data></p>
    </div>
  }

  @if (activeTab === 'Users') {
    <div>
      <h2>Users Data</h2>
      <p><app-user-data></app-user-data></p>
    </div>
  }
</div>


  
    `
     
       
})
export class App {
  protected readonly title = signal('angular-jsonplaceholder-demo');
  
   activeTab: 'Photos' | 'Users' = 'Photos';
  
    setTab(tab: 'Photos' | 'Users') {
    this.activeTab = tab;
}
}
