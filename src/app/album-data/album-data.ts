import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-data.html',
  styleUrls: ['./album-data.css']
})
export class AlbumDataComponent implements OnInit {
  http = inject(HttpClient);
  albums: any[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums').subscribe({
      next: (data) => {
        this.albums =  data.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load album data.';
        this.loading = false;
      }
    });
  }
}
