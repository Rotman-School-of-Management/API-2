import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-data.html',
  styleUrls: ['./user-data.css']
})


export class UserDataComponent implements OnInit {
 loading: boolean = false;
 error: string | null = null; // Declared and initialized!

 
   users: any[] = [];
   filteredUsers: any[] = [];
   searchTerm: string = '';
 
   constructor(private http: HttpClient) {}
 
   ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      });
  }
 
 filterUsers() {
     const query = this.searchTerm.toLowerCase().trim();
     this.filteredUsers = this.users.filter((user) =>
       user.name.toLowerCase().includes(query) ||
       user.email.toLowerCase().includes(query)
     );
   }
}