import { Routes } from '@angular/router';
import { FacultyList } from './faculty-list/faculty-list';
import { Publication } from './publication/publication';

export const routes: Routes = [
  { path: '', redirectTo: 'faculty-list', pathMatch: 'full' },
  { path: 'faculty-list', component: FacultyList },
  { path: 'publications/:id', component: Publication }
];