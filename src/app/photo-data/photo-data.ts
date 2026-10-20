import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-data.html',
  styleUrls: ['./photo-data.css']
})
export class PhotoDataComponent implements OnInit {
  http = inject(HttpClient);
  photos: any[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').subscribe({
      next: (data) => {
        this.photos =  data.slice(0, 12);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load photo data.';
        this.loading = false;
      }
    });
  }
}
