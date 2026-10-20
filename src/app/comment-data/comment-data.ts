import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-data.html',
  styleUrls: ['./comment-data.css']
})
export class CommentDataComponent implements OnInit {
  http = inject(HttpClient);
  comments: any[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments').subscribe({
      next: (data) => {
        this.comments = data.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load comment data.';
        this.loading = false;
      }
    });
  }
}
