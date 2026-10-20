import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-data.html',
  styleUrls: ['./todo-data.css']
})
export class TodoDataComponent implements OnInit {
  http = inject(HttpClient);
  todos: any[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
  
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos').subscribe({
      next: (data) => {
        this.todos = data.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todo data.';
        this.loading = false;
      }
    });
  }
}
