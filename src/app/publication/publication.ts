import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { FacultyService } from '../faculty.service';
import { PublicationItem } from '../models';

@Component({
  imports: [AsyncPipe, FormsModule, RouterLink],
  selector: 'app-publication',
  styleUrl: './publication.css',
  templateUrl: './publication.html',
})
export class Publication {
  private service = inject(FacultyService);

  faculty$ = inject(ActivatedRoute).paramMap.pipe(
    map(p => p.get('id')!),
    switchMap(id => this.service.getById(id))
  );

  filterText = '';

  // ---------- edit state ----------
  editingId: number | null = null;
  draft: PublicationItem | null = null;
  saving = false;
  errorMsg = '';

  filterPubs(pubs: PublicationItem[]): PublicationItem[] {
    const q = this.filterText.trim().toLowerCase();
    if (!q) return pubs;
    return pubs.filter(p => (p.Title ?? '').toLowerCase().includes(q));
  }

  startEdit(p: PublicationItem) {
    this.editingId = p.PublicationsID;
    this.draft = { ...p };          // edit a copy so Cancel discards changes
    this.errorMsg = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingId = null;
    this.draft = null;
    this.errorMsg = '';
  }

  save() {
    if (!this.draft) return;
    this.saving = true;
    this.errorMsg = '';

    this.service.updatePublication(this.draft).subscribe({
      next: () => {
        this.saving = false;
        this.cancelEdit();
      },
      error: () => {
        this.saving = false;
        this.errorMsg = 'Update failed. Check the API console and try again.';
      }
    });
  }
}
