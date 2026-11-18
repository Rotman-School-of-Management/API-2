import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, switchMap, tap } from 'rxjs';
import { FacultyItem, PublicationItem } from './models';

@Injectable({ providedIn: 'root' })
export class FacultyService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5169/api/faculty';

  // emits once at start, and again whenever we call refresh$.next()
  private refresh$ = new BehaviorSubject<void>(undefined);

  // one request, cached and shared by both pages, re-fetched after edits
  private faculty$ = this.refresh$.pipe(
    switchMap(() =>
      this.http.get(this.url, { responseType: 'text', headers: { Accept: 'application/xml' } })
    ),
    map(xml => this.parse(xml)),
    shareReplay(1)
  );

  getAll() {
    return this.faculty$;
  }

  getById(FacultyID: string) {
    return this.faculty$.pipe(map(list => list.find(f => f.FacultyID === FacultyID)));
  }

  updateFaculty(f: { Id: number; FName: string; LName: string; Division: string }) {
    const xml =
      `<Faculty>` +
      `<FName>${this.esc(f.FName)}</FName>` +
      `<LName>${this.esc(f.LName)}</LName>` +
      `<Division>${this.esc(f.Division)}</Division>` +
      `</Faculty>`;

    return this.http
      .put(`${this.url}/${f.Id}`, xml, {
        headers: { 'Content-Type': 'application/xml' },
        responseType: 'text'
      })
      .pipe(tap(() => this.refresh$.next()));
  }

  updatePublication(p: PublicationItem) {
    const year = p.YearPublished != null
      ? `<YearPublished>${p.YearPublished}</YearPublished>`
      : '';   // omitted element becomes null in the API

    const xml =
      `<Publication>` +
      `<Title>${this.esc(p.Title ?? '')}</Title>` +
      `<Publisher>${this.esc(p.Publisher ?? '')}</Publisher>` +
      year +
      `</Publication>`;

    return this.http
      .put(`${this.url}/publications/${p.PublicationsID}`, xml, {
        headers: { 'Content-Type': 'application/xml' },
        responseType: 'text'
      })
      .pipe(tap(() => this.refresh$.next()));
  }

  private esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // read a direct child's text (avoids picking up a nested element with the same name)
  private text(el: Element, tag: string): string {
    return Array.from(el.children).find(c => c.tagName === tag)?.textContent?.trim() ?? '';
  }

  private parse(xml: string): FacultyItem[] {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    if (doc.getElementsByTagName('parsererror').length) {
      console.error('XML parse error:', xml.substring(0, 300));
      return [];
    }

    return Array.from(doc.getElementsByTagName('Faculty')).map((f): FacultyItem => {
      const FacultyID = this.text(f, 'FacultyID');

      const publications = Array.from(f.getElementsByTagName('Publication')).map((p): PublicationItem => {
        const year = this.text(p, 'YearPublished');
        return {
          PublicationsID: Number(this.text(p, 'PublicationsID')),
          FacultyID,
          Title: this.text(p, 'Title'),
          Publisher: this.text(p, 'Publisher'),
          YearPublished: year ? Number(year) : null
        };
      });

      return {
        Id: Number(this.text(f, 'Id')),
        FacultyID,
        FName: this.text(f, 'FName'),
        LName: this.text(f, 'LName'),
        Division: this.text(f, 'Division'),
        publications
      };
    });
  }
}
