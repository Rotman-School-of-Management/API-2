import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FacultyService } from '../faculty.service';
import { FacultyItem } from '../models';

@Component({
  imports: [AsyncPipe, FormsModule, RouterLink],
  selector: 'app-faculty-list',
  styleUrl: './faculty-list.css',
  templateUrl: './faculty-list.html',
})
export class FacultyList {
  private svc = inject(FacultyService);
  faculty$ = this.svc.getAll();

  filterText = '';

  // edit panel state
  editing: FacultyItem | null = null;
  draft = { FName: '', Division: '' };
  saving = false;
  error = '';

  filterFaculty(list: FacultyItem[]): FacultyItem[] {
    const words = this.filterText.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return list;

    return list.filter(f => {
      const haystack = `${f.FName ?? ''} ${f.LName ?? ''} ${f.Division ?? ''}`.toLowerCase();
      return words.every(w => haystack.includes(w));
    });
  }

  startEdit(f: FacultyItem) {
    this.editing = f;
    this.draft = { FName: f.FName, Division: f.Division };
    this.error = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });   // panel is at the top of the page
  }

  cancel() {
    this.editing = null;
    this.draft = { FName: '', Division: '' };
    this.error = '';
  }

  save() {
    if (!this.editing) return;
    this.saving = true;
    this.error = '';

    this.svc.updateFaculty({
      Id: this.editing.Id,
      FName: this.draft.FName.trim(),
      LName: this.editing.LName,
      Division: this.draft.Division.trim()
    }).subscribe({
      next: () => {
        this.saving = false;
        this.cancel();               // list re-fetches via refresh$
      },
      error: err => {
        this.saving = false;
        this.error = 'Save failed. Please try again.';
        console.error(err);
      }
    });
  }
}
