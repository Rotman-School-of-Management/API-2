import { Routes } from '@angular/router';
import { ItemList } from './pages/item-list/item-list';
import { Addnew } from './pages/addnew/addnew';
import { Edit } from './pages/edit/edit';
import { Remove } from './pages/remove/remove';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'pages/addnew', component: Addnew },
  { path: 'pages/edit/:id', component: Edit },
  { path: 'pages/remove/:id', component: Remove },
  { path: '**', redirectTo: '' }
];

